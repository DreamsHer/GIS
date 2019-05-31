using CDGIS.Models;
using CDGIS.Vo;
using DaXingShangMaoSystem.Vo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CDGIS.Controllers
{
    public class JiaoSeGuanLiController : Controller
    {
        // GET: JiaoSeGuanLi
        Models.ChronicGeographicInformationSystemEntities MyModels = new Models.ChronicGeographicInformationSystemEntities();

        #region 角色管理
         /// <summary>
        /// 角色管理
        /// </summary>
        /// <returns></returns>
        public ActionResult JiaoSeJieMian()
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
        /// 前台科室
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectDepartmentType()
        {
            List<SelectVo> list = (from tb in MyModels.S_DepartmenttypeList
                                   where tb.AroundID == 1
                                   select new SelectVo
                                   {
                                       id = tb.DepartmenttypeID,
                                       text = tb.Departmenttype
                                   }).ToList();
            list = Common.Tools.SetSelectJson(list);
            return Json(list, JsonRequestBehavior.AllowGet);
        } 

        /// <summary>
        /// 后台科室
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectDepartment()
        {
            List<SelectVo> list = (from tb in MyModels.S_DepartmenttypeList
                                   where tb.AroundID == 2 //后台
                                   select new SelectVo
                                   {
                                       id = tb.DepartmenttypeID,
                                       text = tb.Departmenttype
                                   }).ToList();
            list = Common.Tools.SetSelectJson(list);
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 新增角色
        /// </summary>
        /// <param name="pwRoleTypeTable"></param>
        /// <returns></returns>
        public ActionResult InserRole(S_UserroleList pwUserroleList)
        {
            string str = "";
            try
            {
                MyModels.S_UserroleList.Add(pwUserroleList);
                MyModels.SaveChanges();//保存角色类型表
                B_DiseaseDetailList pwDiseaseDetailList = new B_DiseaseDetailList(); //疾病明细表
                var list = (from tb in MyModels.S_DiseaseList //疾病表
                            select tb).ToList();
                for (int i = 0; i < list.Count; i++)
                {
                    pwDiseaseDetailList.UserroleID = pwUserroleList.UserroleID; //角色类型ID
                    pwDiseaseDetailList.DiseaseID = 0;  //疾病ID  0为没有该权限
                    if (pwDiseaseDetailList.UserroleID > 0 && pwDiseaseDetailList.DiseaseID != null)
                    {
                        MyModels.B_DiseaseDetailList.Add(pwDiseaseDetailList);
                        MyModels.SaveChanges();//保存疾病明细表
                    }
                }
                B_RoleAuthorityList pwRoleAutTable = new B_RoleAuthorityList();//角色权限表
                var listAuthorizationTable = (from tb in MyModels.B_AuthorityList//权限表
                                              select tb).ToList();
                for (int z = 0; z < listAuthorizationTable.Count; z++)
                {
                    pwRoleAutTable.UserroleID = pwUserroleList.UserroleID;//角色类型id
                    pwRoleAutTable.authorityID = 0;//权限id
                    if (pwRoleAutTable.UserroleID > 0 && pwRoleAutTable.authorityID != null)
                    {
                        MyModels.B_RoleAuthorityList.Add(pwRoleAutTable);
                        MyModels.SaveChanges();//保存角色权限表
                    }
                }
                S_JournalList pwJournalTable = new S_JournalList();
                pwJournalTable.usernameID = Convert.ToInt32(Session["usernameID"]);
                pwJournalTable.Operate = "添加角色";
                pwJournalTable.OperateDate = DateTime.Now;
                MyModels.S_JournalList.Add(pwJournalTable);
                MyModels.SaveChanges();

                str = "添加成功";
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                str = "数据异常，请检查";
            }
            return Json(str, JsonRequestBehavior.AllowGet);
        } 

        /// <summary>
        /// 点击角色查询数据权限
        /// </summary>
        /// <param name="RoleTypeId"></param>
        /// <returns></returns>
        public ActionResult SelectDataauthority(int RoleTypeId)
        {
            var list = (from tb in MyModels.B_DiseaseDetailList
                        where tb.UserroleID == RoleTypeId
                        select new
                        {
                            tb.DiseaseID  //疾病id
                        }).ToList();
            if (list.Count > 0)
            {
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Fail", JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 点击角色查询功能权限
        /// </summary>
        /// <param name="RoleTypeId"></param>
        /// <returns></returns>
        public ActionResult SelectFunctional(int RoleTypeId)
        {
            var list = (from tb in MyModels.B_RoleAuthorityList
                        where tb.UserroleID == RoleTypeId
                        select new
                        {
                            tb.authorityID //权限id
                        }).ToList();
            if (list.Count > 0)
            {
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Fail", JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 科室类型
        /// </summary>
        /// <param name="PositionID"></param>
        /// <returns></returns>
        public string DepartmentType(int PositionID) //职位id
        {
            l++;
            List<OrganizationVo> listNoticeType = new List<OrganizationVo>();
            string ssss = "";
            if (l == 1)
            {
                strfujie = "1";
            }
            else
            {
                strfujie = "2";
            }
            List<OrganizationVo> listNoticeType1 = new List<OrganizationVo>();
            List<OrganizationVo> listDepartmentType = (from tb in MyModels.S_DepartmenttypeList
                                                       where tb.AroundID == PositionID
                                                       select new OrganizationVo
                                                       {
                                                           id = "11",
                                                           idp = tb.DepartmenttypeID,
                                                           name = tb.Departmenttype.Trim(),
                                                           isParent = true,
                                                           pId = strfujie
                                                       }).ToList();
            for (int z = 0; z < listDepartmentType.Count; z++)
            {
                if (strfujie == "1")
                {
                    listDepartmentType[z].id = "1" + (z + 1).ToString();
                }
                else
                {
                    listDepartmentType[z].id = "2" + (z + 1).ToString();
                }
                listNoticeType.Add(listDepartmentType[z]);
                int DepartmentTypeID = listDepartmentType[z].idp; //科室id
                string id = listDepartmentType[z].id;

                List<S_UserroleList> list = MyModels.S_UserroleList.Where(s => s.DepartmenttypeID == DepartmentTypeID).ToList();
                if (list.Count > 0)
                {
                    RoleType(DepartmentTypeID, id);
                    listNoticeType1 = Session["jjj"] as List<OrganizationVo>;
                    for (int j = 0; j < listNoticeType1.Count; j++)
                    {
                        listNoticeType.Add(listNoticeType1[j]);
                    }
                }
            }
            Session["sss"] = listNoticeType;
            return ssss;
        }

        /// <summary>
        /// 角色类型
        /// </summary>
        /// <param name="DepartmentTypeID"></param>
        /// <param name="Arrangement"></param>
        /// <returns></returns>
        public string RoleType(int? DepartmentTypeID, string Arrangement) //科室id，排序
        {
            v++;
            List<OrganizationVo> listNoticeType = new List<OrganizationVo>();
            string str = "";
            if (strfujie == "1")
            {
                str = "1";
            }
            else
            {
                str = "2";
            }
            List<OrganizationVo> listOrganization = (from tb in MyModels.S_UserroleList
                                                     where tb.DepartmenttypeID == DepartmentTypeID
                                                     select new OrganizationVo
                                                     {
                                                         idp = tb.UserroleID,
                                                         name = tb.Userrole.Trim(),
                                                         isParent = false,
                                                         pId = Arrangement
                                                     }).ToList();
            for (int z = 0; z < listOrganization.Count; z++)
            {
                listOrganization[z].id = Arrangement + "1";
                listNoticeType.Add(listOrganization[z]);
            }
            Session["jjj"] = listNoticeType;
            return str;
        }

        /// <summary>
        /// 系统角色树形
        /// </summary>
        int l = 0;
        int v = 0;
        string strfujie = "";
        public ActionResult SelectSystemRole()
        {
            List<OrganizationVo> listNoticeType = new List<OrganizationVo>();
            List<OrganizationVo> listNoticeType1 = new List<OrganizationVo>();

            var listZhiWei = (from tb in MyModels.B_BaseDetailList
                              where tb.BaseTypeID == 1 //1 为前台职位或后台职位
                              select new OrganizationVo
                              {
                                  id = "1",//当前的id
                                  idp = tb.BaseDetailID,//数据库的id
                                  name = tb.BaseDetailName.Trim(),
                                  isParent = true,//是否为父节点
                                  open = true,//打开节点
                                  pId = "0"//父id
                              }).ToList();
            for (int i = 0; i < listZhiWei.Count; i++)
            {
                listZhiWei[i].id = (i + 1).ToString();
                listNoticeType.Add(listZhiWei[i]);
                DepartmentType(listZhiWei[i].idp);
                listNoticeType1 = Session["sss"] as List<OrganizationVo>;
                for (int j = 0; j < listNoticeType1.Count; j++)
                {
                    listNoticeType.Add(listNoticeType1[j]);
                }
            }

            return Json(listNoticeType, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 数据权限树形
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectDisease()
        {
            List<OrganizationVo> listNoticeType = new List<OrganizationVo>();
            var list = (from tb in MyModels.S_DiseaseList
                        select new OrganizationVo
                        {
                            id = "1",//当前的id
                            idp = tb.DiseaseID,//数据库的id
                            name = tb.DiseaseName.Trim(),
                            isParent = true,//是否为父节点
                            open = true,//打开节点
                            pId = "0"//父id
                        }).ToList();
            for (int i = 0; i < list.Count; i++)
            {
                list[i].id = (i + 1).ToString();
                listNoticeType.Add(list[i]);

            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 功能权限树形
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectFunctionalAuthority()
        {
            List<OrganizationVo> listNoticeType = new List<OrganizationVo>();
            var list = (from tb in MyModels.B_AuthorityList
                        select new OrganizationVo
                        {
                            id = "1",//当前的id
                            idp = tb.authorityID,//数据库的id
                            name = tb.authority.Trim(),
                            isParent = true,//是否为父节点
                            open = true,//打开节点
                            pId = "0"//父id
                        }).ToList();
            for (int i = 0; i < list.Count; i++)
            {
                list[i].id = (i + 1).ToString();
                listNoticeType.Add(list[i]);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改查询角色
        /// </summary>
        /// <param name="RoleTypeId"></param>
        /// <returns></returns>
        public ActionResult SelectRoleInfo(int RoleTypeId)
        {
            var list = (from tb in MyModels.S_UserroleList
                        where tb.UserroleID == RoleTypeId
                        select new
                        {
                            tb.UserroleID,
                            tb.DepartmenttypeID,
                            tb.Userrole
                        }).Single();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改角色
        /// </summary>
        /// <param name="pwRoleTypeTable"></param>
        /// <returns></returns>
        public ActionResult UpdateRole()
        {
            string str = "";
            try
            {
                S_UserroleList pwRoleTypeTable = new S_UserroleList();
                pwRoleTypeTable.UserroleID = Convert.ToInt32(Request.Form["UserroleID"]);
                pwRoleTypeTable.DepartmenttypeID = Convert.ToInt32(Request.Form["DepartmenttypeID"]);
                pwRoleTypeTable.Userrole = Request.Form["Userrole"];
                MyModels.Entry(pwRoleTypeTable).State = System.Data.Entity.EntityState.Modified;
                MyModels.SaveChanges();

                S_JournalList pwJournalTable = new S_JournalList();
                pwJournalTable.usernameID = Convert.ToInt32(Session["usernameID"]);
                pwJournalTable.Operate = "修改角色";
                pwJournalTable.OperateDate = DateTime.Now;
                MyModels.S_JournalList.Add(pwJournalTable);
                MyModels.SaveChanges();

                str = "修改成功";
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                str = "数据异常，请检查";
            }
            return Json(str, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除角色
        /// </summary>
        /// <param name="RoleTypeId"></param>
        /// <returns></returns>
        public ActionResult DeleteRoleType(int RoleTypeId)
        {
            string str = "";
            try
            {
                //删除角色类型表
                var pwRoleTypeTable = MyModels.S_UserroleList.Where(s => s.UserroleID == RoleTypeId).Single();
                MyModels.S_UserroleList.Remove(pwRoleTypeTable); 
                MyModels.SaveChanges();

                //删除疾病明细表
                var pwDiseaseDetailTable = MyModels.B_DiseaseDetailList.Where(i => i.UserroleID == RoleTypeId).ToList();
                for (int z = 0; z < pwDiseaseDetailTable.Count; z++)
                {
                    MyModels.B_DiseaseDetailList.Remove(pwDiseaseDetailTable[z]); 
                }
                MyModels.SaveChanges(); 

                //删除角色权限表
                var pwRoleAutTable = MyModels.B_RoleAuthorityList.Where(y => y.UserroleID == RoleTypeId).ToList();
                for (int a = 0; a < pwRoleAutTable.Count; a++)
                {
                    MyModels.B_RoleAuthorityList.Remove(pwRoleAutTable[a]);
                }
                MyModels.SaveChanges();

                S_JournalList pwJournalTable = new S_JournalList();
                pwJournalTable.usernameID = Convert.ToInt32(Session["usernameID"]);
                pwJournalTable.Operate = "删除角色";
                pwJournalTable.OperateDate = DateTime.Now;
                MyModels.S_JournalList.Add(pwJournalTable);
                MyModels.SaveChanges();

                str = "删除成功";
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                str = "数据异常，请检查";
            }
            return Json(str, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 保存分配
        /// </summary>
        /// <param name="DataPermiss"></param>
        /// <param name="FunctionalAuthority"></param>
        /// <returns></returns>
        public ActionResult UpdatePermissions(Array DataPermiss, Array FunctionalAuthority)
        {
            ///////////////////////////////////   数据权限    //////////////////////////////////////////////
            string DataPermissArr = ((string[])DataPermiss)[0];
            string[] intDataPermissArr = DataPermissArr.Split(',');//分割
            int RoleTypeID = Convert.ToInt32(intDataPermissArr[0]);
            var list = (from tb in MyModels.B_DiseaseDetailList
                        where tb.UserroleID == RoleTypeID//根据角色类型id查询疾病明细id
                        select new
                        {
                            tb.DiseaseDetailID
                        }).ToList();
            for (int i = 0; i < list.Count; i++)
            {
                var DiseaseDetailID = list[i].DiseaseDetailID;
                var Delete = (from tb in MyModels.B_DiseaseDetailList
                              where tb.DiseaseDetailID == DiseaseDetailID
                              select tb).Single();
                MyModels.B_DiseaseDetailList.Remove(Delete);
                MyModels.SaveChanges();
            }
            for (int j = 1; j < intDataPermissArr.Length; j++)
            {
                var RoleTypeid = intDataPermissArr[0];
                B_DiseaseDetailList dis = new B_DiseaseDetailList();
                dis.UserroleID = Convert.ToInt32(RoleTypeid);
                dis.DiseaseID = Convert.ToInt32(intDataPermissArr[j]);
                if (dis.UserroleID > 0 && dis.DiseaseID != null)
                {
                    MyModels.B_DiseaseDetailList.Add(dis);
                    MyModels.SaveChanges();
                }
            }
            ///////////////////////////////////   功能权限    //////////////////////////////////////////////
            string FunctionalAuthorityArr = ((string[])FunctionalAuthority)[0];
            string[] intFunctionalAuthorityArr = FunctionalAuthorityArr.Split(',');//分割
            int roletypeid = Convert.ToInt32(intFunctionalAuthorityArr[0]);
            var listFunctionalAuthority = (from tb in MyModels.B_RoleAuthorityList
                                           where tb.UserroleID == roletypeid//根据角色类型id查询角色权限id
                                           select new
                                           {
                                               tb.RoleAuthorityID
                                           }).ToList();
            for (int z = 0; z < listFunctionalAuthority.Count; z++)
            {
                var RoleAutID = listFunctionalAuthority[z].RoleAuthorityID;
                var Delete = (from tb in MyModels.B_RoleAuthorityList
                              where tb.RoleAuthorityID == RoleAutID
                              select tb).Single();
                MyModels.B_RoleAuthorityList.Remove(Delete);
                MyModels.SaveChanges();
            }
            for (int y = 1; y < intFunctionalAuthorityArr.Length; y++)
            {
                var RoleTypeid = intFunctionalAuthorityArr[0];
                B_RoleAuthorityList role = new B_RoleAuthorityList();
                role.UserroleID = Convert.ToInt32(RoleTypeid);
                role.authorityID = Convert.ToInt32(intFunctionalAuthorityArr[y]);
                if (role.UserroleID > 0 && role.authorityID != null )
                {
                    MyModels.B_RoleAuthorityList.Add(role);
                    MyModels.SaveChanges();
                }
            }
            return Json("success", JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}