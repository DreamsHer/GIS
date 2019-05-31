using CDGIS.Models;
using CDGIS.Vo;
using DaXingShangMaoSystem.Vo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace CDGIS.Controllers
{
    public class YongHuGuanLiController : Controller
    {
        // GET: YongHuGuanLi
        Models.ChronicGeographicInformationSystemEntities MyModels = new Models.ChronicGeographicInformationSystemEntities();
        /// <summary>
        /// 用户管理
        /// </summary>
        /// <returns></returns>
        public ActionResult GuanLiJieMian()
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
        /// 角色类型
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectUserroleID()
        {
            List<SelectVo> listUserrole = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择角色----"
            };
            listUserrole.Add(selectVo);

            List<SelectVo> listPriceTypeID = (from tbUserrole in MyModels.S_UserroleList
                                              select new SelectVo
                                              {
                                                  id = tbUserrole.UserroleID,
                                                  text = tbUserrole.Userrole.Trim()
                                              }).ToList();

            listUserrole.AddRange(listPriceTypeID);

            return Json(listUserrole, JsonRequestBehavior.AllowGet);
        }  

        /// <summary>
        /// 科室类型
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectDepartmenttypeID()
        {
            List<SelectVo> listUserrole = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择科室----"
            };
            listUserrole.Add(selectVo);

            List<SelectVo> listPriceTypeID = (from tbUserrole in MyModels.S_DepartmenttypeList
                                              select new SelectVo
                                              {
                                                  id = tbUserrole.DepartmenttypeID,
                                                  text = tbUserrole.Departmenttype.Trim()
                                              }).ToList();

            listUserrole.AddRange(listPriceTypeID);

            return Json(listUserrole, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 前后台
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectFrontandbackID()
        {
            List<SelectVo> listUserrole = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择前或后台----"
            };
            listUserrole.Add(selectVo);

            List<SelectVo> listPriceTypeID = (from tbUserrole in MyModels.B_BaseDetailList
                                              where tbUserrole.BaseDetailID == 1 || tbUserrole.BaseDetailID == 2
                                              select new SelectVo
                                              {
                                                  id = tbUserrole.BaseDetailID,
                                                  text = tbUserrole.BaseDetailName.Trim()
                                              }).ToList();

            listUserrole.AddRange(listPriceTypeID);

            return Json(listUserrole, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 验证身份证号码
        /// </summary>
        /// <param name="IdentityNumber"></param>
        /// <returns></returns>
        public bool Is_IDCard(string IDnumber)
        {

            if (IDnumber != "")
            {
                return Regex.IsMatch(IDnumber, @"^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$");
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 验证手机号码
        /// </summary>
        /// <param name="PhoneNumber"></param>
        /// <returns></returns>
        public bool Is_MobileNumber(string phonenumber)
        {
            if (phonenumber != "")
            {
                return Regex.IsMatch(phonenumber, @"^[1]+[3,8,5,7,4]+\d{9}$");
            }
            else
            {
                return false;
            } 
        }

        //验证邮箱
        public bool Is_PostNumber(string postbox)
        {
            if (postbox != "")
            {
                return Regex.IsMatch(postbox, @"^[0-9a-z_]+@(([0-9a-z]+)[.]){1,2}[a-z]{2,3}$");
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 新增用户
        /// </summary>
        /// <returns></returns>
        public ActionResult AddUserMessage(B_UsernameList tbold)
        {
            string strMsg = "fali";
            int userID = tbold.usernameID;
            var dbUser = MyModels.B_UsernameList.Where(p => p.usernameID == userID).ToList();
            try
            {
                int oldstring = (from tb in MyModels.B_UsernameList
                                 where tb.username == tbold.username
                                 select tb).Count();

                if (oldstring == 0)
                {
                    B_UsernameList KK = new B_UsernameList(); 

                    KK.username = Request.Form["username"];
                    KK.name = Request.Form["name"];
                    KK.password = Common.AESEncryptHelper.Encrypt(Request.Form["UniformAuthenticationCode"]);
                    KK.UniformAuthenticationCode = Request.Form["UniformAuthenticationCode"];
                    //KK.IDnumber = Common.AESEncryptHelper.Encrypt(Request.Form["IDnumber"]);
                    KK.IDnumber = Request.Form["IDnumber"];
                    KK.location = Request.Form["location"];
                    KK.phonenumber = Request.Form["phonenumber"];
                    KK.postbox = Request.Form["postbox"];
                    KK.UserroleID = Convert.ToInt32(Request.Form["UserroleID"]);
                    KK.DepartmenttypeID = Convert.ToInt32(Request.Form["DepartmenttypeID"]);
                    KK.BaseDetailID = Convert.ToInt32(Request.Form["BaseDetailID"]);            
                    KK.remarks = Request.Form["remarks"]; 
                    KK.USERReviewNo = Convert.ToBoolean(Request.Form["USERReviewNo"]);

                    if (KK.username != null && KK.name != null && KK.UniformAuthenticationCode != null && KK.IDnumber != null && KK.location != null
                        && KK.phonenumber != null && KK.postbox != null && KK.UserroleID != null && KK.DepartmenttypeID != null && KK.BaseDetailID != null)
                    {
                        MyModels.B_UsernameList.Add(KK);
                        //MyModels.SaveChanges();

                        S_JournalList pwJournalList = new S_JournalList();
                        pwJournalList.usernameID = Convert.ToInt32(Session["usernameID"]);
                        pwJournalList.Operate = "新增用户";
                        pwJournalList.OperateDate = DateTime.Now;
                        MyModels.S_JournalList.Add(pwJournalList);
                        MyModels.SaveChanges();  

                    }
                    strMsg = "success";

                }
               

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                strMsg = "exsit"; 
            }

            return Json(strMsg, JsonRequestBehavior.AllowGet); 

        }

        /// <summary>
        /// 条件查询
        /// </summary>
        /// <param name="bsgridPage"></param>
        /// <param name="Qusername"></param>
        /// <param name="frontandbackID"></param>
        /// <param name="userroleID"></param>
        /// <returns></returns>
        public ActionResult ConditionalQuery(BsgridPage bsgridPage, string Qusername, int frontandbackID, int userroleID)
        {
            var items = (from tbUsername in MyModels.B_UsernameList
                         join tbUserrole in MyModels.S_UserroleList on tbUsername.UserroleID equals tbUserrole.UserroleID
                         join tbFrontandback in MyModels.B_BaseDetailList on tbUsername.BaseDetailID equals tbFrontandback.BaseDetailID
                         join tbDepartmenttype in MyModels.S_DepartmenttypeList on tbUsername.DepartmenttypeID equals tbDepartmenttype.DepartmenttypeID
                         orderby tbUsername.usernameID
                         select new Vo.YinYong
                         {
                             usernameID = tbUsername.usernameID,
                             username = tbUsername.username,
                             name = tbUsername.name,
                             IDnumber = tbUsername.IDnumber,
                             phonenumber = tbUsername.phonenumber,
                             BaseDetailID = tbFrontandback.BaseDetailID,
                             BaseDetailName = tbFrontandback.BaseDetailName,
                             UserroleID = tbUserrole.UserroleID,
                             Userrole = tbUserrole.Userrole,
                             remarks = tbUsername.remarks,
                             USERReviewNo = tbUsername.USERReviewNo,
                         });
            //如果查询条件不为空
            if (!string.IsNullOrEmpty(Qusername))
            {
                Qusername = Qusername.Trim();
                items = items.Where(p => p.username.Contains(Qusername));
            }
            if (frontandbackID > 0)
            {
                items = items.Where(p => p.BaseDetailID == frontandbackID);
            }
            if (userroleID > 0)
            {
                items = items.Where(p => p.UserroleID == userroleID);
            }

            int intTotalRow = items.Count();//总行数
            List<YinYong> notices = items.OrderByDescending(p => p.usernameID).//noboer表达式
               Skip(bsgridPage.GetStartIndex()).//F12（看）
               Take(bsgridPage.pageSize).
               ToList();
            Bsgrid<YinYong> bsgrid = new Bsgrid<YinYong>();
            bsgrid.success = true;
            bsgrid.totalRows = intTotalRow;
            bsgrid.curPage = bsgridPage.curPage;
            bsgrid.data = notices;
            return Json(bsgrid, JsonRequestBehavior.AllowGet); 
           
        }

        /// <summary>
        /// 角色类型
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectUserroleID1()
        {
            List<SelectVo> listUserrole = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择角色----"
            };
            listUserrole.Add(selectVo);

            List<SelectVo> listPriceTypeID = (from tbUserrole in MyModels.S_UserroleList
                                              select new SelectVo
                                              {
                                                  id = tbUserrole.UserroleID,
                                                  text = tbUserrole.Userrole.Trim()
                                              }).ToList();

            listUserrole.AddRange(listPriceTypeID);

            return Json(listUserrole, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 科室类型
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectDepartmenttypeID1()
        {
            List<SelectVo> listUserrole = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择科室----"
            };
            listUserrole.Add(selectVo);

            List<SelectVo> listPriceTypeID = (from tbUserrole in MyModels.S_DepartmenttypeList
                                              select new SelectVo
                                              {
                                                  id = tbUserrole.DepartmenttypeID,
                                                  text = tbUserrole.Departmenttype.Trim()
                                              }).ToList();

            listUserrole.AddRange(listPriceTypeID);

            return Json(listUserrole, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 前后台
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectFrontandbackID1()
        {
            List<SelectVo> listUserrole = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择前或后台----"
            };
            listUserrole.Add(selectVo);

            List<SelectVo> listPriceTypeID = (from tbUserrole in MyModels.B_BaseDetailList
                                              //where tbUserrole.BaseDetailID == 1 || tbUserrole.BaseDetailID == 2
                                              select new SelectVo
                                              {
                                                  id = tbUserrole.BaseDetailID,
                                                  text = tbUserrole.BaseDetailName.Trim()
                                              }).ToList();

            listUserrole.AddRange(listPriceTypeID);

            return Json(listUserrole, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 绑定用户信息
        /// </summary>
        /// <param name="GID"></param>
        /// <returns></returns>
        public ActionResult HuoQuShuJuXiuGai(int GID)
        {
            if (GID > 0)
            {
                var listGoods = (from tbUsername in MyModels.B_UsernameList
                                 join tbUserrole in MyModels.S_UserroleList on tbUsername.UserroleID equals tbUserrole.UserroleID
                                 join tbFrontandback in MyModels.B_BaseDetailList on tbUsername.BaseDetailID equals tbFrontandback.BaseDetailID
                                 join tbDepartmenttype in MyModels.S_DepartmenttypeList on tbUsername.DepartmenttypeID equals tbDepartmenttype.DepartmenttypeID                              
                                 where tbUsername.usernameID == GID  
                                 select new Vo.YinYong
                                 {
                                     usernameID = tbUsername.usernameID,
                                     username = tbUsername.username,
                                     name = tbUsername.name,
                                     IDnumber = tbUsername.IDnumber,
                                     phonenumber = tbUsername.phonenumber,
                                     UniformAuthenticationCode = tbUsername.UniformAuthenticationCode,
                                     location = tbUsername.location,
                                     postbox = tbUsername.postbox,
                                     BaseDetailID = tbFrontandback.BaseDetailID,
                                     BaseDetailName = tbFrontandback.BaseDetailName,
                                     UserroleID = tbUserrole.UserroleID,
                                     Userrole = tbUserrole.Userrole,
                                     DepartmenttypeID = tbDepartmenttype.DepartmenttypeID,
                                     Departmenttype = tbDepartmenttype.Departmenttype,
                                     remarks = tbUsername.remarks,
                                     USERReviewNo = tbUsername.USERReviewNo,
                                 }).Single();
                return Json(listGoods, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("失败");
            }
        }

        /// <summary>
        /// 修改保存
        /// </summary>
        /// <param name="tbold"></param>
        /// <returns></returns>
        public ActionResult UpdatePreserve(B_UsernameList tbold)
        {
            string strMsg = "fali";
            int userID = tbold.usernameID;
            var dbUser = MyModels.B_UsernameList.Where(p => p.usernameID == userID).ToList();
            try
            {              
                if (tbold.usernameID > 0)
                {
                    B_UsernameList KK = MyModels.B_UsernameList.Where(p => p.usernameID == userID).Single(); 

                    KK.usernameID = userID;
                    KK.username = Request.Form["username"];
                    KK.name = Request.Form["name"];
                    //KK.password = Common.AESEncryptHelper.Encrypt(Request.Form["password"]);
                    KK.UniformAuthenticationCode = Request.Form["UniformAuthenticationCode"];
                    //KK.IDnumber = Common.AESEncryptHelper.Encrypt(Request.Form["IDnumber"]);
                    KK.IDnumber = Request.Form["IDnumber"];
                    KK.location = Request.Form["location"];
                    KK.phonenumber = Request.Form["phonenumber"];
                    KK.postbox = Request.Form["postbox"];
                    KK.UserroleID = Convert.ToInt32(Request.Form["UserroleID"]);
                    KK.DepartmenttypeID = Convert.ToInt32(Request.Form["DepartmenttypeID"]);
                    KK.BaseDetailID = Convert.ToInt32(Request.Form["BaseDetailID"]);
                    KK.remarks = Request.Form["remarks"];
                    KK.USERReviewNo = tbold.USERReviewNo;

                    MyModels.Entry(KK).State = System.Data.Entity.EntityState.Modified;
                    MyModels.SaveChanges();

                    S_JournalList pwJournalList = new S_JournalList();
                    pwJournalList.usernameID = Convert.ToInt32(Session["usernameID"]);
                    pwJournalList.Operate = "修改用户";
                    pwJournalList.OperateDate = DateTime.Now;
                    MyModels.S_JournalList.Add(pwJournalList);  
                    MyModels.SaveChanges(); 
                   
                }
                strMsg = "success";

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                strMsg = "exsit";
            }
            return Json(strMsg, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="usernameId"></param>
        /// <returns></returns>
        public ActionResult DeleteUsername(int usernameId)
        {
            //定义返回
            string strMsg = "fail";
            try
            {
                B_UsernameList dbPurchase = (from tbGoods in MyModels.B_UsernameList
                                             where tbGoods.usernameID == usernameId
                                             select tbGoods).Single();

                MyModels.B_UsernameList.Remove(dbPurchase);

                if (MyModels.SaveChanges() > 0)
                {
                    strMsg = "success";

                    S_JournalList pwJournalList = new S_JournalList();
                    pwJournalList.usernameID = Convert.ToInt32(Session["usernameID"]);
                    pwJournalList.Operate = "删除用户";
                    pwJournalList.OperateDate = DateTime.Now;
                    MyModels.S_JournalList.Add(pwJournalList);
                    MyModels.SaveChanges();

                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return Json(strMsg, JsonRequestBehavior.AllowGet);

        }


    }
}