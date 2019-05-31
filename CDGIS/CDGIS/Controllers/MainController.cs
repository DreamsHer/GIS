using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CDGIS.Models;

namespace CDGIS.Controllers
{
    public class MainController : Controller
    {
        // GET: Main
        Models.ChronicGeographicInformationSystemEntities MyModels = new Models.ChronicGeographicInformationSystemEntities();
        /// <summary>
        /// 登录界面
        /// </summary>
        /// <returns></returns>
        public ActionResult Login()
        {
            string username = "";
            string password = "";

            HttpCookie cookie = System.Web.HttpContext.Current.Request.Cookies["user"];

            ViewBag.username = username;
            ViewBag.password = password;

            return View();
        }

        /// <summary>
        /// 主界面
        /// </summary>
        /// <returns></returns>
        public ActionResult Main()
        {
            try
            {
                string strStaffId = Session["usernameID"].ToString();  

                string strServerTime = Session["ServerTime"].ToString();  

                string strUserName = "";//用户名称

                int intStaffId = Convert.ToInt32(strStaffId);

                var student = (from tbStudent in MyModels.B_UsernameList
                               where tbStudent.usernameID == intStaffId 
                               select tbStudent).Single();

                strUserName = student.username;


                strServerTime = "登录时间：" + strServerTime;

                ViewBag.username = strUserName;
                ViewBag.serverTime = strServerTime;

                return View();
            }
            catch (Exception e)
            {
                Console.Write(e);
                //无法获取session 重定向到登录界面 重新登录
                return RedirectToAction("Login");
            }

            //return View();
        }  

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="bStaffList"></param>
        /// <returns></returns>
        public ActionResult UserLogin()
        {
            string strMsg = "fail";//返回的字符串
            string strUserName = Request.Form["username"];//用户名
            string strpassword = Request.Form["password"];//密码
            string strvalidCode = Request.Form["validCode"];//验证码 

            string strSessionvildeCode = "";
            if (Session["vildeCode"] != null)
            {
                strSessionvildeCode = Session["vildeCode"].ToString();
                if (strSessionvildeCode.Equals(strvalidCode, StringComparison.CurrentCultureIgnoreCase))
                {
                    try
                    {
                        //根据 UserName 查询用户
                        var dbStaff = (from tbStaff in MyModels.B_UsernameList
                                       where tbStaff.username == strUserName.Trim()
                                       select new
                                       {
                                           tbStaff.usernameID,
                                           tbStaff.username,
                                           tbStaff.password,
                                           tbStaff.UniformAuthenticationCode
                                       }).Single();

                        string strPass = Common.AESEncryptHelper.Encrypt(strpassword); //调用加密铭文

                        if (strPass == dbStaff.password)
                        {
                            if (strPass == dbStaff.password)
                            {
                                HttpCookie cookie = new HttpCookie("user");
                                cookie["username"] = strUserName;
                                cookie["password"] = strpassword; 
                                cookie.Expires = DateTime.Now.AddDays(7);
                                Response.Cookies.Add(cookie);
                            }
                            else
                            {
                                HttpCookie cookie = new HttpCookie("user");
                                cookie.Expires = DateTime.Now.AddDays(-1);
                                Response.Cookies.Add(cookie);
                            }

                            string strTime = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
                            // 设置session
                            Session["usernameID"] = dbStaff.usernameID; // 传递 UserID   

                            Session["ServerTime"] = strTime;//登录时间 

                            strMsg = "Main";  
                           
                        }
                        else
                        {
                            strMsg = "passwordErro";
                        }
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                    }
                }
                else
                {
                    strMsg = "vlodeCodeErro";
                }
            }
            else
            {
                strMsg = "loginErro";
            }

            return Json(strMsg, JsonRequestBehavior.AllowGet);  

        }

        /// <summary>
        /// 获得登录时间（分钟）
        /// </summary>
        /// <returns></returns>
        public ActionResult GetLoginTime()
        {
            try
            {
                string loginTime = Session["ServerTime"].ToString();//获取Session中的时间
                DateTime dateTimeLogin = Convert.ToDateTime(loginTime);//转为datetime
                DateTime dateTimeNow = DateTime.Now;//获取当前时间
                TimeSpan time = dateTimeNow - dateTimeLogin;//求时间差
                double minute = time.TotalMinutes;
                int intMinute = Convert.ToInt32(minute);

                return Json(intMinute, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Redirect("/Main/Login");
            }
        }

        /// <summary>
        /// 生成验证码图片
        /// </summary>
        /// <returns></returns>
        public ActionResult ValideCode()
        {
            string strVildeCode = Common.validCodeUtils.GetRandomCode(4);//获取随机字符串
            Session["vildeCode"] = strVildeCode;//放入session
            byte[] vildeImage = Common.validCodeUtils.CreateImage(strVildeCode);//byte[]//根据验证码产生图片
            return File(vildeImage, @"image/jpeg");//把图片返回到视图            
        }

        /// <summary>
        /// 清空session
        /// </summary>
        /// <returns></returns>
        public ActionResult LoginOut()
        {
            Session.Clear();
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 权限设计
        /// </summary>
        /// <param name="usernameID"></param>
        /// <returns></returns>
        public ActionResult SelectModule(int usernameId)
        {
            var list = (from tbRoleAut in MyModels.B_RoleAuthorityList
                        join tbUser in MyModels.B_UsernameList on tbRoleAut.UserroleID equals tbUser.UserroleID
                        join tbAuthorization in MyModels.B_AuthorityList on tbRoleAut.authorityID equals tbAuthorization.authorityID
                        where tbUser.usernameID == usernameId && tbAuthorization.authorityID <= 4
                        select new
                        {
                            ID = tbAuthorization.authorityID,//权限id
                            Name = tbAuthorization.authority.Trim()//权限MC
                        }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Home()
        {
            return View();
        }

    }
}