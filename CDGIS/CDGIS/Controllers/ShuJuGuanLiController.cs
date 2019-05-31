using CDGIS.Models;
using CDGIS.Vo;
using DaXingShangMaoSystem.Vo;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace CDGIS.Controllers
{
    public class ShuJuGuanLiController : Controller
    {
        // GET: ShuJuGuanLi
        Models.ChronicGeographicInformationSystemEntities MyModels = new Models.ChronicGeographicInformationSystemEntities();

        #region 导入数据

        /// <summary>
        /// 导入数据
        /// </summary>
        /// <returns></returns>
        public ActionResult DaoRuShuJu()
        {
            try
            {
                int user = Convert.ToInt32(Session["usernameID"].ToString());
            }
            catch (Exception)
            {
                return Redirect("/Main/Login");
            }

            return View();
        }

        /// <summary>
        /// 模板模型
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectModelType()
        {
            List<SelectVo> listDepartmentType = (from tbBaseType in MyModels.B_BaseDetailList
                                                 where tbBaseType.BaseTypeID == 10
                                                 select new SelectVo
                                                 {
                                                     id = tbBaseType.BaseDetailID,
                                                     text = tbBaseType.BaseDetailName,
                                                 }).ToList();
            listDepartmentType = Common.Tools.SetSelectJson(listDepartmentType);
            return Json(listDepartmentType, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 导入excel
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public ActionResult ImportExcel(HttpPostedFileBase file)
        {
            try
            {
                //思路：获取读取的文件，把文件转换为二进制数组，然后转成内存流，利用NPOI把内存流中的数据读取成Excel

                Session.Remove("ImportExcel");//把session中的ImportExcel移除避免残留以前数据
                string fileExtension = System.IO.Path.GetExtension(file.FileName);//读取路径文件的扩展名
                if (".xls".Equals(fileExtension) || ".XLS".Equals(fileExtension))//判断读取的文件是.xls文件
                {
                    byte[] fileBytes = new byte[file.ContentLength];//指定数组的长度获取Excel数据的大小
                    file.InputStream.Read(fileBytes, 0, file.ContentLength);//读取文件内容

                    // 转为 内存流
                    System.IO.MemoryStream excelFileStream = new System.IO.MemoryStream(fileBytes);

                    //将内存流转为 工作簿
                    NPOI.SS.UserModel.IWorkbook workbook = new NPOI.HSSF.UserModel.HSSFWorkbook(excelFileStream);

                    //判断工作簿中的工作表（Sheet）的个数
                    if (workbook.NumberOfSheets > 0)
                    {
                        //查询出 学院,专业,年级,班级 的信息：目的是用来查看导入的数据是否有重复
                        List<PatientVo> lsitStudentVos = new List<PatientVo>();

                        // 获取第一个工作表
                        NPOI.SS.UserModel.ISheet sheet = workbook.GetSheetAt(0);

                        //PhysicalNumberOfRows 获取的是物理行数，也就是不包括那些空行（隔行）的情况。
                        //判断 工作表（sheet)中有数据
                        if (sheet.PhysicalNumberOfRows > 0)
                        {
                            //将数据先装到datatable中
                            // 定义datatable
                            DataTable dtExcel = new DataTable();

                            //获取标题行 第一行
                            NPOI.SS.UserModel.IRow headerRow = sheet.GetRow(0);
                            //获取一行单元格个数  LastCellNum 获取列数，比最后一列列标大 1
                            int cellCount = headerRow.LastCellNum;
                            //获取数据总行数    LastRowNum  最后一行行标，比行数小 1
                            int rowCount = sheet.LastRowNum + 1;

                            //创建DataTable的列Columns
                            for (int i = headerRow.FirstCellNum; i < cellCount; i++)
                            {
                                DataColumn column = new DataColumn(headerRow.GetCell(i).StringCellValue);
                                dtExcel.Columns.Add(column);
                            }

                            //读取Excel中的数据
                            //(sheet.FirstRowNum) 第一行是标题
                            for (int i = (sheet.FirstRowNum + 1); i < rowCount; i++)
                            {
                                NPOI.SS.UserModel.IRow row = sheet.GetRow(i);//获取行
                                DataRow dataRow = dtExcel.NewRow();//DataTable创建一行
                                if (row != null)
                                {
                                    //遍历Excel一行的所有单元格
                                    for (int j = row.FirstCellNum; j < cellCount; j++)
                                    {
                                        if (row.GetCell(j) != null)
                                        {
                                            dataRow[j] = row.GetCell(j).ToString();
                                        }
                                    }
                                }
                                //添加行DataRow到DataTable
                                dtExcel.Rows.Add(dataRow);
                            }

                            //遍历datatable 获取数据
                            foreach (DataRow row in dtExcel.Rows)
                            {
                                //创建一个 StudentVo的对象
                                PatientVo student = new PatientVo();
                                try
                                {
                                    //获取性别ID
                                    var dd = row["性别"].ToString().Trim();
                                    var SexID = (from tbSex in MyModels.B_BaseDetailList where tbSex.BaseDetailName == dd select tbSex.BaseDetailID).Single();
                                    student.sexID = Convert.ToInt32(SexID);

                                    student.Sex = row["性别"].ToString().Trim();

                                    //病人所属ID
                                    var PatientOwnership = row["病人所属"].ToString().Trim();
                                    var cantonID = (from tbSex in MyModels.B_BaseDetailList where tbSex.BaseDetailName == PatientOwnership select tbSex.BaseDetailID).Single();
                                    student.cantonID = Convert.ToInt32(cantonID);

                                    student.PatientOwnership = row["病人所属"].ToString().Trim(); 

                                    //获取人群分类id和名称
                                    var CrowdClass = row["人群分类"].ToString().Trim();
                                    var CrowdclassificationID = (from tbSex in MyModels.B_BaseDetailList where tbSex.BaseDetailName == CrowdClass select tbSex.BaseDetailID).Single();
                                    student.CrowdclassificationID = Convert.ToInt32(CrowdclassificationID);

                                    student.CrowdClass = row["人群分类"].ToString().Trim();

                                    //获取病例分类ID和名称
                                    var CaseClass = row["病例分类"].ToString().Trim();
                                    var CaseClassID = (from tbSex in MyModels.B_BaseDetailList where tbSex.BaseDetailName == CaseClass select tbSex.BaseDetailID).Single();
                                    student.CaseClassID = Convert.ToInt32(CaseClassID);

                                    student.CaseClass = row["病例分类"].ToString().Trim(); 

                                    //获取病例名称ID和名称
                                    var DiseaseType = row["疾病名称类型"].ToString().Trim();
                                    var DiseaseTypeID = (from tbSex in MyModels.B_BaseDetailList where tbSex.BaseDetailName == DiseaseType select tbSex.BaseDetailID).Single();
                                    student.DiseaseTypeID = Convert.ToInt32(DiseaseTypeID);

                                    student.DiseaseType = row["疾病名称类型"].ToString().Trim();  

                                    //获取审核状态ID和名称
                                    var AuditStatu = row["审核状态"].ToString().Trim();
                                    var AuditStatusID = (from tbSex in MyModels.B_BaseDetailList where tbSex.BaseDetailName == AuditStatu select tbSex.BaseDetailID).Single();
                                    student.AuditStatusID = Convert.ToInt32(AuditStatusID);

                                    student.AuditStatus = row["审核状态"].ToString().Trim();


                                    //给创建实体赋值
                                    student.Cardnumber = row["卡片编号"].ToString().Trim(); 
                                    student.name = row["患者姓名"].ToString().Trim();
                                    student.IDnumber = row["身份证号码"].ToString().Trim();
                                    student.BirthDateTime = row["出生日期"].ToString().Trim();
                                    student.workunit = row["工作单位"].ToString().Trim();
                                    student.Addressnationalstandard = row["现详细住址国标"].ToString().Trim();
                                    student.Detailedaddress = row["现住详细地址"].ToString().Trim();
                                    student.CensusAddressInter = row["户籍地址国标"].ToString().Trim();
                                    student.CensusAddDetail = row["户籍地址详细"].ToString().Trim();
                                    student.MorbidityDateTime = row["发病日期"].ToString().Trim(); 
                                    student.DiagnoseDateTime = row["诊断日期"].ToString().Trim();
                                    student.ReportDateTime = row["录入日期"].ToString().Trim();
                                    student.RevisedDateTime = row["订正终审日期"].ToString().Trim();
                                    student.Occupation = row["职业"].ToString().Trim();
                                    student.Remark = row["备注"].ToString().Trim();  

                                    lsitStudentVos.Add(student);
                                }
                                catch (Exception e)
                                {
                                    Console.WriteLine(e);
                                }
                            }
                            //把数据存在session当中做临时保存，这里还没有保存到数据库
                            Session["ImportExcel"] = lsitStudentVos;
                            return Json(true, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            //物理行数为0
                        }
                    }
                    else
                    {
                        //没有工作表
                    }
                }
                else
                {
                    //上传的文件类型不正确
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 查询导入的文件列表
        /// </summary>
        /// <param name="bsgridPage"></param>
        /// <returns></returns>
        public ActionResult SelectSessImportStudent(BsgridPage bsgridPage)
        {
            List<PatientVo> studentVos = new List<PatientVo>();
            if (Session["ImportExcel"] != null)
            {
                studentVos = Session["ImportExcel"] as List<PatientVo>;
            }

            List<PatientVo> listStudent = studentVos.OrderBy(p => p.SickpersonID).Skip(bsgridPage.GetStartIndex()).Take(bsgridPage.pageSize).ToList();

            Bsgrid<PatientVo> bsgrid = new Bsgrid<PatientVo>();
            bsgrid.success = true;
            bsgrid.curPage = bsgridPage.curPage;
            bsgrid.totalRows = studentVos.Count;
            bsgrid.data = studentVos;
            return Json(bsgrid, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 保存导入
        /// </summary>
        /// <returns></returns>
        public ActionResult SaveImport()
        {
            string returnstr = "";
            try
            {
                int savedCount = 0;//保存成功的条数
                int oldCount = 0;//已经存在的数据条数
                //int DeleCar = 0;//过滤删除卡的信息

                List<PatientVo> PatientVos = new List<PatientVo>();
                if (Session["ImportExcel"] != null)
                {
                    PatientVos = Session["ImportExcel"] as List<PatientVo>;
                }

                if (PatientVos.Count > 0)
                {
                    foreach (PatientVo studentVo in PatientVos)
                    {
                        int intOld = (from tbPatient in MyModels.B_SickpersonList
                                      where tbPatient.IDnumber == studentVo.IDnumber && tbPatient.Cardnumber == studentVo.Cardnumber
                                      select tbPatient).Count();

                        //没有重复的
                        if (intOld == 0)
                        {
                            //保存疫情直报信息
                            B_SickpersonList Patien = new B_SickpersonList();
                            Patien.sexID = studentVo.sexID;
                            Patien.CrowdclassificationID = studentVo.CrowdclassificationID;
                            Patien.CaseClassID = studentVo.CaseClassID;
                            Patien.DiseaseTypeID = studentVo.DiseaseTypeID;
                            Patien.AuditStatusID = studentVo.AuditStatusID;
                            Patien.Cardnumber = studentVo.Cardnumber;
                            Patien.name = studentVo.name;
                            Patien.IDnumber = studentVo.IDnumber;
                            Patien.dateofbirth = Convert.ToDateTime(studentVo.BirthDateTime);  
                            Patien.workunit = studentVo.workunit;
                            Patien.cantonID = studentVo.cantonID;
                            Patien.Addressnationalstandard = studentVo.Addressnationalstandard;
                            Patien.Detailedaddress = studentVo.Detailedaddress;
                            Patien.CensusAddressInter = studentVo.CensusAddressInter;
                            Patien.CensusAddDetail = studentVo.CensusAddDetail;
                            Patien.Occupation = studentVo.Occupation;
                            Patien.MorbidityDate = Convert.ToDateTime(studentVo.MorbidityDateTime);
                            Patien.DiagnoseDate = Convert.ToDateTime(studentVo.DiagnoseDateTime); 
                            Patien.ReportDate = Convert.ToDateTime(studentVo.RevisedDateTime);
                            Patien.RevisedDate = Convert.ToDateTime(studentVo.RevisedDateTime);
                            Patien.Remark = studentVo.Remark;

                            MyModels.B_SickpersonList.Add(Patien); 
                            savedCount = savedCount + MyModels.SaveChanges();

                            int PatID = Patien.SickpersonID;
                            if (Patien.AuditStatusID == 26)
                            {
                                B_SickpersonList dbPatientTable = MyModels.B_SickpersonList.Where(p => p.SickpersonID == PatID).Single();
                                MyModels.B_SickpersonList.Remove(dbPatientTable);
                                MyModels.SaveChanges();
                                //DeleCar++;
                                savedCount--;
                            }

                        }
                        else
                        {    
                            var studentone = (from tbUser in MyModels.B_SickpersonList where tbUser.IDnumber == studentVo.IDnumber select tbUser.SickpersonID).ToList();
                            int UserID = Convert.ToInt32(studentone[0]);
                            B_SickpersonList Patien = MyModels.B_SickpersonList.Where(p => p.SickpersonID == UserID).Single();

                            Patien.sexID = studentVo.sexID;
                            Patien.CrowdclassificationID = studentVo.CrowdclassificationID;
                            Patien.CaseClassID = studentVo.CaseClassID;
                            Patien.DiseaseTypeID = studentVo.DiseaseTypeID;
                            Patien.AuditStatusID = studentVo.AuditStatusID;
                            Patien.Cardnumber = studentVo.Cardnumber;
                            Patien.name = studentVo.name;
                            Patien.IDnumber = studentVo.IDnumber;
                            Patien.DiagnoseDate = Convert.ToDateTime(studentVo.DiagnoseDateTime);
                            Patien.ReportDate = Convert.ToDateTime(studentVo.RevisedDateTime);
                            Patien.RevisedDate = Convert.ToDateTime(studentVo.RevisedDateTime);
                            Patien.MorbidityDate = Convert.ToDateTime(studentVo.MorbidityDateTime);
                            Patien.dateofbirth = Convert.ToDateTime(studentVo.BirthDateTime);
                            Patien.workunit = studentVo.workunit;
                            Patien.cantonID = studentVo.cantonID;
                            Patien.Addressnationalstandard = studentVo.Addressnationalstandard;
                            Patien.Detailedaddress = studentVo.Detailedaddress;
                            Patien.CensusAddressInter = studentVo.CensusAddressInter;
                            Patien.CensusAddDetail = studentVo.CensusAddDetail;
                            Patien.Occupation = studentVo.Occupation;

                            Patien.Remark = studentVo.Remark;
                            MyModels.Entry(Patien).State = EntityState.Modified;
                            MyModels.SaveChanges();

                            oldCount++;
                            int PatID = Patien.SickpersonID;
                            if (Patien.AuditStatusID == 26)
                            {
                                B_SickpersonList dbPatientTable = MyModels.B_SickpersonList.Where(p => p.SickpersonID == PatID).Single();
                                MyModels.B_SickpersonList.Remove(dbPatientTable);
                                MyModels.SaveChanges();
                                //DeleCar++;
                                oldCount--;
                            }
                        }
                    }
                    S_JournalList pwJournalList = new S_JournalList();
                    pwJournalList.usernameID = Convert.ToInt32(Session["usernameID"]);
                    pwJournalList.Operate = "导入数据";
                    pwJournalList.OperateDate = DateTime.Now;
                    MyModels.S_JournalList.Add(pwJournalList);
                    MyModels.SaveChanges();

                    //returnstr = "导入" + PatientVos.Count + "条数据,更新的数据有" + oldCount + "条,成功保存了" + savedCount  + "条数据到数据库：" + DeleCar + "条";
                      
                    returnstr = "导入" + PatientVos.Count + "条数据,更新的数据有" + oldCount + "条,成功保存了" + savedCount + "条数据到数据库";

                    if (savedCount > 0)
                    {

                    }
                }
                else
                {
                    returnstr = "没有要保存的";
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return Json(returnstr, JsonRequestBehavior.AllowGet);
        }           

        #endregion

        #region 基础数据
        /// <summary>
        /// 基础数据
        /// </summary>
        /// <returns></returns>
        public ActionResult ShuJuJieMian()
        {
            try
            {
                int user = Convert.ToInt32(Session["usernameID"].ToString());
            }
            catch (Exception)
            {
                return Redirect("/Main/Login");
            }

            return View();
        }

        /// <summary>
        /// 新增属性信息
        /// </summary>
        /// <param name="dbBaseTypeList"></param>
        /// <returns></returns>
        public ActionResult InsertBaseTypeName(B_BaseTypeList dbBaseTypeList)
        {
            string StrMy = "";
            try
            {
                if (dbBaseTypeList.BaseTypeName != "")
                {
                    MyModels.B_BaseTypeList.Add(dbBaseTypeList);
                    MyModels.SaveChanges();

                    S_JournalList pwJournalList = new S_JournalList();
                    pwJournalList.usernameID = Convert.ToInt32(Session["usernameID"]);
                    pwJournalList.Operate = "新增属性";
                    pwJournalList.OperateDate = DateTime.Now;
                    MyModels.S_JournalList.Add(pwJournalList);
                    MyModels.SaveChanges();
                    StrMy = "success";
                }
                return Json(StrMy, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return null;
            }
        }

        /// <summary>
        /// 查询树形数据
        /// </summary>
        /// <returns></returns>
        public ActionResult QueryProperties()
        {
            StringBuilder DropdownType = new StringBuilder();
            var listBaseType = (from tbBaseType in MyModels.B_BaseTypeList
                           select new
                           {
                               id = tbBaseType.BaseTypeID,
                               test = tbBaseType.BaseTypeName.Trim()
                           }).ToList();  
            

            DropdownType.Append("[");
            for (int i = 0; i < listBaseType.Count; i++)
            {
                DropdownType.Append("{\"id\":\"" + listBaseType[i].id + "\",\"text\":\"" + listBaseType[i].test + "\"},");
            }
            DropdownType.Replace(',', ' ', DropdownType.Length - 1, 1);
            DropdownType.Append("]");
            return Content(DropdownType.ToString());
        }

        /// <summary>
        /// 查询属性信息
        /// </summary>
        /// <param name="bsgridPage"></param>
        /// <param name="GasisId"></param>
        /// <returns></returns>
        public ActionResult SelectProperties(BsgridPage bsgridPage, int GasisId)
        {
            var listGasis = from tbBaseDetail in MyModels.B_BaseDetailList
                            select new Vo.BaseDetai
                            {
                                BaseTypeID = tbBaseDetail.BaseTypeID,
                                BaseDetailID = tbBaseDetail.BaseDetailID,
                                BaseDetailName = tbBaseDetail.BaseDetailName,
                                CancelBit = tbBaseDetail.CancelBit,
                            };
            if (GasisId > 0)
            {
                listGasis = listGasis.Where(p => p.BaseTypeID == GasisId);
            }

            int intTotalRow = listGasis.Count();
            List<BaseDetai> listGasiss = listGasis.OrderByDescending(p => p.BaseTypeID).Skip(bsgridPage.GetStartIndex()).Take(bsgridPage.pageSize).ToList();

            Bsgrid<BaseDetai> Bsgrid = new Bsgrid<BaseDetai>();
            Bsgrid.success = true;
            Bsgrid.totalRows = intTotalRow;
            Bsgrid.curPage = bsgridPage.curPage;
            Bsgrid.data = listGasiss;
            return Json(Bsgrid, JsonRequestBehavior.AllowGet);
        }  

        /// <summary>
        /// 新增属性字段
        /// </summary>
        /// <param name="ShuXing"></param>
        /// <returns></returns>
        public ActionResult InsertProperties(B_BaseDetailList Dropdown)
        {
            B_BaseDetailList dep = new B_BaseDetailList();

            var T_DropdownDetail = Dropdown.BaseDetailID;

            if (T_DropdownDetail == 0)
            {
                var DropdownTypeid = Dropdown.BaseTypeID;
                var list = (from tb in MyModels.B_BaseDetailList
                            where tb.BaseTypeID == DropdownTypeid
                            select new
                            {
                                tb.BaseDetailName,

                            }).ToList();
                var dropdownDetailName = 0;
                for (int i = 0; i < list.Count; i++)
                {
                    if (Dropdown.BaseDetailName == list[i].BaseDetailName)
                    {
                        dropdownDetailName++;
                    }
                }
                if (dropdownDetailName > 0)
                {
                    return Json("已存在", JsonRequestBehavior.AllowGet);
                }
                else
                {

                    dep.BaseTypeID = Dropdown.BaseTypeID;
                    dep.BaseDetailName = Dropdown.BaseDetailName;
                    MyModels.B_BaseDetailList.Add(dep);
                    MyModels.SaveChanges();

                    S_JournalList pwJournalTable = new S_JournalList();
                    pwJournalTable.usernameID = Convert.ToInt32(Session["usernameID"]);
                    pwJournalTable.Operate = "新增属性字段";
                    pwJournalTable.OperateDate = DateTime.Now;
                    MyModels.S_JournalList.Add(pwJournalTable);
                    MyModels.SaveChanges();
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                var DropdownTypeId = Dropdown.BaseTypeID;
                var list = (from tb in MyModels.B_BaseDetailList
                            where tb.BaseTypeID == DropdownTypeId
                            select new
                            {
                                tb.BaseDetailName,
                            }).ToList();
                var dropdownDetailNameT = 0;
                for (int i = 0; i < list.Count; i++)
                {
                    if (Dropdown.BaseDetailName == list[i].BaseDetailName)
                    {
                        dropdownDetailNameT++;
                    }
                }
                if (dropdownDetailNameT > 0)
                {
                    return Json("已存在", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    dep.BaseDetailID = Dropdown.BaseDetailID;
                    dep.BaseTypeID = Dropdown.BaseTypeID;
                    dep.BaseDetailName = Dropdown.BaseDetailName;
                    MyModels.B_BaseDetailList.Add(dep);
                    MyModels.SaveChanges();

                    S_JournalList pwJournalTable = new S_JournalList();
                    pwJournalTable.usernameID = Convert.ToInt32(Session["usernameID"]);
                    pwJournalTable.Operate = "新增基础数据";
                    pwJournalTable.OperateDate = DateTime.Now;
                    MyModels.S_JournalList.Add(pwJournalTable);
                    MyModels.SaveChanges();
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
            }
        }

        /// <summary>
        /// 查询属性字段
        /// </summary>
        /// <param name="GasiId"></param>
        /// <returns></returns>
        public ActionResult SelectGasisById(int GasiId)
        {
            try
            {
                BaseDetai CheLiang = (from tbSupplier in MyModels.B_BaseDetailList
                                    where tbSupplier.BaseDetailID == GasiId
                                    select new BaseDetai
                                    {
                                        BaseTypeID = tbSupplier.BaseTypeID,
                                        BaseDetailID = tbSupplier.BaseDetailID,
                                        BaseDetailName = tbSupplier.BaseDetailName,
                                    }).Single();
                return Json(CheLiang, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 修改数字能够字段
        /// </summary>
        /// <param name="Dropdown"></param>
        /// <returns></returns>
        public ActionResult UpdateXiaLa(B_BaseDetailList Dropdown)
        {
            string strMsg = "Fail";
            try
            {
                var DropdownTypeid = Dropdown.BaseTypeID;
                var list = (from tb in MyModels.B_BaseDetailList
                            where tb.BaseTypeID == DropdownTypeid
                            select new
                            {
                                tb.BaseDetailName,
                            }).ToList();
                var dropdownDetailName = 0;
                for (int i = 0; i < list.Count; i++)
                {
                    if (Dropdown.BaseDetailName == list[i].BaseDetailName)
                    {
                        dropdownDetailName++;
                    }
                }
                if (dropdownDetailName > 0)
                {
                    strMsg = "已存在";
                }
                else
                {
                    MyModels.Entry(Dropdown).State = System.Data.Entity.EntityState.Modified;
                    MyModels.SaveChanges();

                    S_JournalList pwJournalTable = new S_JournalList();
                    pwJournalTable.usernameID = Convert.ToInt32(Session["usernameID"]);
                    pwJournalTable.Operate = "修改属性字段";
                    pwJournalTable.OperateDate = DateTime.Now;
                    MyModels.S_JournalList.Add(pwJournalTable);
                    MyModels.SaveChanges();
                    strMsg = "success";
                }
            }
            catch (Exception e)
            {

                Console.WriteLine(e);
            }
            return Json(strMsg, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除属性字段
        /// </summary>
        /// <param name="ENID"></param>
        /// <returns></returns>
        public ActionResult DelectGasisById(int ENID)
        {
            if (ENID > 0)
            {
                try
                {
                    var listCheliang = (from tb in MyModels.B_BaseDetailList
                                        where tb.BaseDetailID == ENID
                                        select tb).Single();
                    B_BaseDetailList db = MyModels.B_BaseDetailList.Where(p => p.BaseDetailID == ENID).Single();
                    db.CancelBit = true;
                    MyModels.Entry(db).State = System.Data.Entity.EntityState.Modified;
                    MyModels.SaveChanges();

                    S_JournalList pwJournalTable = new S_JournalList();
                    pwJournalTable.usernameID = Convert.ToInt32(Session["usernameID"]);
                    pwJournalTable.Operate = "删除属性字段";
                    pwJournalTable.OperateDate = DateTime.Now;
                    MyModels.S_JournalList.Add(pwJournalTable);
                    MyModels.SaveChanges();

                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                catch (Exception)
                {
                    return Json("Fail", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json("Fail", JsonRequestBehavior.AllowGet);
            }
        } 

        #endregion

    }
}