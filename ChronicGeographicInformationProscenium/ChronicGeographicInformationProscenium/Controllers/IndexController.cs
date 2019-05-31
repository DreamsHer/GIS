using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using ChronicGeographicInformationProscenium.Common;
using System.Web.Security;
using ChronicGeographicInformationProscenium.Vo;

namespace ChronicGeographicInformationProscenium.Controllers
{
    public class IndexController : Controller
    {
        // GET: 
        Models.ChronicGeographicInformationSystemEntities MyModels = new Models.ChronicGeographicInformationSystemEntities();
        //Models.GuangZhouCongHua_DataEntities MyModelsGIS = new Models.GuangZhouCongHua_DataEntities();

        #region 登录界面
        public ActionResult login()
        {
            string username = "";
            string password = "";

            HttpCookie cookie = System.Web.HttpContext.Current.Request.Cookies["user"];

            ViewBag.username = username;
            ViewBag.password = password;

            //Session["username"] = Utils.GetCookie("ChronicGeographicInformationProscenium", "username");//获取Cookie的账号

            return View();  
          
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

            try
            {
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

                var dbBaseDetail = (from tbStaff in MyModels.B_BaseDetailList
                                    where tbStaff.BaseDetailID == 1
                                    select new
                                    {
                                        tbStaff.BaseDetailID,
                                        tbStaff.BaseDetailName,
                                    }).Single();


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
                return Redirect("/Index/Login");
            }
        }

        #endregion

        #region 主界面
        /// <summary>
        ///  主界面
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
        } 


        /// <summary>
        /// 性别
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectXProperty()
        {
            List<SelectVo> listNoticeType = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择---"
            };
            listNoticeType.Add(selectVo);

            List<SelectVo> listPropertyDetail = (from tbPropertyDetail in MyModels.B_BaseDetailList
                                                 where tbPropertyDetail.BaseTypeID == 2
                                                 select new SelectVo
                                                 {
                                                     text = tbPropertyDetail.BaseDetailName,
                                                     id = tbPropertyDetail.BaseDetailID,
                                                 }).ToList();
            listNoticeType.AddRange(listPropertyDetail);//多个添加AddRange
            return Json(listNoticeType, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 疾病名称
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectJProperty()
        {
            List<SelectVo> listNoticeType = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择---"
            };
            listNoticeType.Add(selectVo);

            List<SelectVo> listPropertyDetail = (from tbPropertyDetail in MyModels.B_BaseDetailList
                                                 where tbPropertyDetail.BaseDetailID == 21
                                                 select new SelectVo
                                                 {
                                                     text = tbPropertyDetail.BaseDetailName,
                                                     id = tbPropertyDetail.BaseDetailID,
                                                 }).ToList();
            listNoticeType.AddRange(listPropertyDetail);//多个添加AddRange
            return Json(listNoticeType, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 病例类型
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectJBProperty()
        {
            List<SelectVo> listNoticeType = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择---"
            };
            listNoticeType.Add(selectVo);

            List<SelectVo> listPropertyDetail = (from tbPropertyDetail in MyModels.B_BaseDetailList
                                                 where tbPropertyDetail.BaseTypeID == 4
                                                 select new SelectVo
                                                 {
                                                     text = tbPropertyDetail.BaseDetailName,
                                                     id = tbPropertyDetail.BaseDetailID,
                                                 }).ToList();
            listNoticeType.AddRange(listPropertyDetail);//多个添加AddRange
            return Json(listNoticeType, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 查询条件
        /// </summary>
        /// <param name="NPropertyID">年龄</param>
        /// <param name="XPropertyID">性别</param>
        /// <param name="JPropertyID">疾病</param>
        /// <param name="JBPropertyID">疾病亚型</param>
        /// <param name="RegistrationMark">登记号</param>
        /// <param name="EndYear">结束时间</param>
        /// <param name="StartYear">开始时间</param>
        /// <param name="ActivityType"></param>
        /// <returns></returns>
        public ActionResult SelectSufferYear(int NPropertyID, int XPropertyID, int JPropertyID, int JBPropertyID, string RegistrationMark, string EndYear, string StartYear, string ActivityType)
        {
            if (ActivityType == "1")
            {
                var listSelectSuspiciousDrugResistance = (from tbSickpersonDetail in MyModels.B_SickpersonDetailList 
                                                          join tbSickperson in MyModels.B_SickpersonList on tbSickpersonDetail.SickpersonID equals tbSickperson.SickpersonID  
                                                          join tbBaseDetail in MyModels.B_BaseDetailList on tbSickpersonDetail.BaseDetailID equals tbBaseDetail.BaseDetailID
                                                          select new SickpersonVo
                                                          {
                                                              SickpersonDetailID = tbSickpersonDetail.SickpersonDetailID,
                                                              SickpersonID = tbSickperson.SickpersonID,
                                                              name = tbSickperson.name,
                                                              Birthdays = tbSickperson.dateofbirth.ToString(),//生日
                                                              DiseaseID = tbSickperson.DiseaseID,//疾病
                                                              DiseaseTypeID = tbSickperson.DiseaseTypeID, //疾病类型
                                                              BaseDetailID = tbBaseDetail.BaseDetailID, //病例类型 
                                                              BaseDetailName = tbBaseDetail.BaseDetailName, 
                                                              sexID = tbSickperson.sexID,//性别 
                                                              Age = tbSickperson.Age,//年龄
                                                              Cardnumber = tbSickperson.Cardnumber, //登记号  

                                                          }).ToList();
                if (!string.IsNullOrEmpty(StartYear))  //日期
                {
                    try
                    {
                        DateTime dateStart = Convert.ToDateTime(StartYear);
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(p => Convert.ToDateTime(p.Birthdays) >= dateStart && Convert.ToDateTime(p.Birthdays) <= Convert.ToDateTime(EndYear)).ToList();

                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        return null;
                    }
                }  
                if (RegistrationMark != "")//登记号
                {
                    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => f.Cardnumber.Contains(RegistrationMark.Trim())).ToList();
                }
                if (NPropertyID != 0)//年龄
                {
                    if (NPropertyID == 1)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) <= 4).ToList();
                    }
                    if (NPropertyID == 2)
                    {

                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 5 && Convert.ToDecimal(f.Age) <= 9).ToList();
                    }
                    if (NPropertyID == 3)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 10 && Convert.ToDecimal(f.Age) <= 14).ToList();
                    }
                    if (NPropertyID == 4)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 15 && Convert.ToDecimal(f.Age) <= 24).ToList();
                    }
                    if (NPropertyID == 5)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 25 && Convert.ToDecimal(f.Age) <= 34).ToList();
                    }
                    if (NPropertyID == 6)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 35 && Convert.ToDecimal(f.Age) <= 44).ToList();
                    }
                    if (NPropertyID == 7)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 45 && Convert.ToDecimal(f.Age) <= 54).ToList();
                    }
                    if (NPropertyID == 8)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 55 && Convert.ToDecimal(f.Age) <= 64).ToList();
                    }
                    if (NPropertyID == 9)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 65 && Convert.ToDecimal(f.Age) <= 74).ToList();
                    }
                    if (NPropertyID == 10)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 75 && Convert.ToDecimal(f.Age) <= 84).ToList();
                    }
                    if (NPropertyID == 11)
                    {
                        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 85).ToList();
                    }
                }
                if (XPropertyID != 0)//性别
                {
                    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(p => p.sexID == XPropertyID).ToList();
                }
                if (JPropertyID != 0)//疾病
                {
                    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(p => p.DiseaseID == JPropertyID).ToList();
                }
                if (JBPropertyID != 0)//疾病亚型
                {
                    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(p => p.BaseDetailID == JBPropertyID).ToList();
                } 

                return Json(listSelectSuspiciousDrugResistance, JsonRequestBehavior.AllowGet);

            }

            return Json(false, JsonRequestBehavior.AllowGet);

        }

        /// <summary>
        /// 病原天数查询
        /// </summary>
        /// <param name="NPropertyID"></param>
        /// <param name="XPropertyID"></param>
        /// <param name="HPropertyID"></param>
        /// <param name="JPropertyID"></param>
        /// <param name="JBPropertyID"></param>
        /// <param name="RegistrationMark"></param>
        /// <returns></returns>
        public ActionResult SelectSufferDay(int NPropertyID, int XPropertyID, int HPropertyID, int JPropertyID, int JBPropertyID, string RegistrationMark)
        {

            //var listSelectSuspiciousDrugResistance = (from tbSuffer in myYueXiuChronicSystematicEntities.S_SuffererData
            //                                          join tbPropertyDetail in myYueXiuChronicSystematicEntities.S_PropertyDetailData
            //                                          on tbSuffer.Pro_PropertiesDetailID equals tbPropertyDetail.PropertyDetailID
            //                                          join tbPro_PropertyDetailID in myYueXiuChronicSystematicEntities.S_PropertyDetailData on tbSuffer.Pro_PropertyDetailID equals tbPro_PropertyDetailID.PropertyDetailID
            //                                          join tbDisease in myYueXiuChronicSystematicEntities.S_DiseaseData on tbSuffer.SuffererID equals tbDisease.SuffererID
            //                                          join tbPro_PropertyDetailIDs in myYueXiuChronicSystematicEntities.S_PropertyDetailData on tbDisease.Pro_PropertyDetailID equals tbPro_PropertyDetailIDs.PropertyDetailID
            //                                          join tbCardNumberID in myYueXiuChronicSystematicEntities.S_CardNumberData on tbSuffer.CardNumberID equals tbCardNumberID.CardNumberID
            //                                          select new SuffererVo
            //                                          {
            //                                              SuffererName = tbSuffer.SuffererName,
            //                                              SuffererID = tbSuffer.SuffererID,
            //                                              Birthdays = tbSuffer.Birthday.ToString(),//生日
            //                                              DiseaseID = tbDisease.DiseaseID,//疾病
            //                                              PropertyDetailID = tbDisease.PropertyDetailID,//疾病类型
            //                                              Pro_PropertyDetailIDs = tbPro_PropertyDetailIDs.PropertyDetailID,//疾病亚型
            //                                              Pro_PropertyDetailID = tbPro_PropertyDetailID.PropertyDetailID,//户籍
            //                                              PropertyDetailss = tbPro_PropertyDetailID.PropertyDetail,
            //                                              Pro_PropertiesDetailID = tbPropertyDetail.PropertyDetailID,//性别
            //                                              PropertyDetail = tbPropertyDetail.PropertyDetail,
            //                                              Age = tbSuffer.Age,//年龄
            //                                              CardNumber = tbCardNumberID.CardNumber,
            //                                              PresentResidenceDetailed = tbSuffer.PresentResidenceDetailed,
            //                                              SmX = tbSuffer.SmX,
            //                                              SmY = tbSuffer.SmY,
            //                                          }).ToList();
            //if (NPropertyID != 0)//年龄
            //{
            //    if (NPropertyID == 1)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) <= 4).ToList();
            //    }
            //    if (NPropertyID == 2)
            //    {

            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 5 && Convert.ToDecimal(f.Age) <= 9).ToList();
            //    }
            //    if (NPropertyID == 3)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 10 && Convert.ToDecimal(f.Age) <= 14).ToList();
            //    }
            //    if (NPropertyID == 4)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 15 && Convert.ToDecimal(f.Age) <= 24).ToList();
            //    }
            //    if (NPropertyID == 5)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 25 && Convert.ToDecimal(f.Age) <= 34).ToList();
            //    }
            //    if (NPropertyID == 6)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 35 && Convert.ToDecimal(f.Age) <= 44).ToList();
            //    }
            //    if (NPropertyID == 7)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 45 && Convert.ToDecimal(f.Age) <= 54).ToList();
            //    }
            //    if (NPropertyID == 8)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 55 && Convert.ToDecimal(f.Age) <= 64).ToList();
            //    }
            //    if (NPropertyID == 9)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 65 && Convert.ToDecimal(f.Age) <= 74).ToList();
            //    }
            //    if (NPropertyID == 10)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 75 && Convert.ToDecimal(f.Age) <= 84).ToList();
            //    }
            //    if (NPropertyID == 11)
            //    {
            //        listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => Convert.ToDecimal(f.Age) >= 85).ToList();
            //    }
            //}
            //if (XPropertyID != 0)//性别
            //{
            //    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(p => p.Pro_PropertiesDetailID == XPropertyID).ToList();
            //}
            //if (HPropertyID != 0)//户籍
            //{
            //    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(p => p.Pro_PropertyDetailID == HPropertyID).ToList();
            //}
            //if (JPropertyID != 0)//疾病
            //{
            //    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(p => p.PropertyDetailID == JPropertyID).ToList();
            //}
            //if (JBPropertyID != 0)//疾病亚型
            //{
            //    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(p => p.Pro_PropertyDetailIDs == JBPropertyID).ToList();
            //}
            //if (RegistrationMark != "")//登记号
            //{
            //    listSelectSuspiciousDrugResistance = listSelectSuspiciousDrugResistance.Where(f => f.CardNumber.Contains(RegistrationMark.Trim())).ToList();
            //}


            //return Json(listSelectSuspiciousDrugResistance, JsonRequestBehavior.AllowGet);

            return View();

        }

        /// <summary>
        /// 轨迹
        /// </summary>
        /// <param name="SuffererID"></param>
        /// <returns></returns>
        public ActionResult SelectSickpersonRajectoryr(int SickpersonDetailID)
        {

            var listSuffererRajectory = (from tbSuffererRajectoryr in MyModels.S_SickpersonRajectoryrList
                                         where tbSuffererRajectoryr.SickpersonDetailID == SickpersonDetailID
                                         orderby tbSuffererRajectoryr.ActivityTime
                                         select new SickpersonRajectoryrVo
                                         {
                                             SickpersonRajectoryrID = tbSuffererRajectoryr.SickpersonRajectoryrID,
                                             SmX = tbSuffererRajectoryr.SmX,
                                             SmY = tbSuffererRajectoryr.SmY,
                                             ActivityTimes = tbSuffererRajectoryr.ActivityTime.ToString(),

                                         }).ToList();

            return Json(listSuffererRajectory, JsonRequestBehavior.AllowGet); 

        }


        /// <summary>
        /// 病例分布信息
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectS_DiseaseData()
        {
            var listSelectSuspiciousDrugResistance = (from tbSickpersonDetaiID in MyModels.B_SickpersonDetailList
                                                      join tbSickpersonID in MyModels.B_SickpersonList on tbSickpersonDetaiID.SickpersonID equals tbSickpersonID.SickpersonID
                                                      join tbBaseDetail in MyModels.B_BaseDetailList on tbSickpersonDetaiID.BaseDetailID equals tbBaseDetail.BaseDetailID
                                                      select new
                                                      {
                                                          SickpersonID = tbSickpersonID.SickpersonID,//疾病ID
                                                          name = tbSickpersonID.name,    //患者名称
                                                          SmX = tbSickpersonDetaiID.SmX,
                                                          SmY = tbSickpersonDetaiID.SmY,
                                                          Cardnumber = tbSickpersonID.Cardnumber,//卡片编号
                                                          BaseDetailID = tbBaseDetail.BaseDetailID,//性别
                                                          Age = tbSickpersonID.Age, //年龄
                                                          Detailedaddress = tbSickpersonID.Detailedaddress,//地址
                                                      }).ToList();
            return Json(listSelectSuspiciousDrugResistance, JsonRequestBehavior.AllowGet);   
         
        }

        /// <summary>
        /// 病原分布信息
        /// </summary>
        /// <returns></returns>
        public ActionResult SelectSickpersonDetail()
        {
            var listSelectSuspiciousDrugResistance = (from tbSickpersonDetaiID in MyModels.B_SickpersonDetailList 
                                                      join tbSickpersonID in MyModels.B_SickpersonList on tbSickpersonDetaiID.SickpersonID equals tbSickpersonID.SickpersonID
                                                      join tbBaseDetail in MyModels.B_BaseDetailList on tbSickpersonDetaiID.BaseDetailID equals tbBaseDetail.BaseDetailID
                                                      select new
                                                      {
                                                          DrugResistantMycobacteriumBit = tbSickpersonDetaiID.DrugResistantMycobacteriumBit,//耐药结核杆菌 
                                                          SmX = tbSickpersonDetaiID.SmX,
                                                          SmY = tbSickpersonDetaiID.SmY,
                                                          name = tbSickpersonID.name, //患者名称
                                                          Cardnumber = tbSickpersonID.Cardnumber,//卡片编号
                                                          BaseDetailID = tbBaseDetail.BaseDetailID,//性别
                                                          Age = tbSickpersonID.Age, //年龄
                                                          Detailedaddress = tbSickpersonID.Detailedaddress,//地址
                                                      });
            return Json(listSelectSuspiciousDrugResistance, JsonRequestBehavior.AllowGet); 

        }

        /// <summary>
        /// 预警
        /// </summary>
        /// <returns></returns>
        public ActionResult Selectillness()
        {
            //var listSelectSuspiciousDrugResistance = (from tbCaseIllness in myYueXiuChronicSystematicEntities.B_CaseIllnessData
            //                                          join tbSuffer in myYueXiuChronicSystematicEntities.S_SuffererData on tbCaseIllness.SuffererID equals tbSuffer.SuffererID
            //                                          join tbPropertyDetail in myYueXiuChronicSystematicEntities.S_PropertyDetailData
            //                                          on tbCaseIllness.PropertyDetailID equals tbPropertyDetail.PropertyDetailID
            //                                          join tbPropertyDetailID in myYueXiuChronicSystematicEntities.S_PropertyDetailData on tbCaseIllness.Pro_PropertyDetailID equals tbPropertyDetailID.PropertyDetailID
            //                                          select new
            //                                          {
            //                                              tbCaseIllness.CaseIllnessID,
            //                                              SuffererName = tbSuffer.SuffererName,
            //                                              SmX = tbSuffer.SmX,
            //                                              SmY = tbSuffer.SmY,
            //                                              PropertyDetail = tbPropertyDetail.PropertyDetail,//病例
            //                                              tbSuffer.PresentResidenceDetailed,
            //                                              tbCaseIllness.Overcomebit,
            //                                          });
            //return Json(listSelectSuspiciousDrugResistance, JsonRequestBehavior.AllowGet);
            return View();
        }

        /// <summary>
        /// 解除预警
        /// </summary>
        /// <param name="CaseIllness"></param>
        /// <returns></returns>
        //public ActionResult Updateillness(B_CaseIllnessData CaseIllness)
        //{
        //    string strmsg = "";
        //    try
        //    {
        //        var UpdateCaseIllnessData = (from tbCaseIllness in myYueXiuChronicSystematicEntities.B_CaseIllnessData
        //                                     where tbCaseIllness.CaseIllnessID == CaseIllness.CaseIllnessID
        //                                     select tbCaseIllness).Single();
        //        UpdateCaseIllnessData.Overcomebit = true;
        //        myYueXiuChronicSystematicEntities.Entry(UpdateCaseIllnessData).State = System.Data.Entity.EntityState.Modified;
        //        myYueXiuChronicSystematicEntities.SaveChanges();
        //        strmsg = "success";
        //        return Json(strmsg, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e);
        //        return Json(false, JsonRequestBehavior.AllowGet);
        //    }
        //}


        #endregion

        #region 报表报告
        /// <summary>
        /// 报表报告
        /// </summary>
        /// <returns></returns>
        public ActionResult Report()
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
        /// 病例类型
        /// </summary>
        /// <returns></returns>
        public ActionResult CaseClass()
        {
            List<SelectVo> listUserrole = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择角色----"
            };
            listUserrole.Add(selectVo);

            List<SelectVo> listPriceTypeID = (from tbUserrole in MyModels.B_BaseDetailList
                                              where tbUserrole.BaseTypeID == 4
                                              select new SelectVo
                                              {
                                                  id = tbUserrole.BaseDetailID,
                                                  text = tbUserrole.BaseDetailName.Trim()
                                              }).ToList();

            listUserrole.AddRange(listPriceTypeID);

            return Json(listUserrole, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 条件查询报表
        /// </summary>
        /// <param name="bsgridPage"></param>
        /// <param name="KReportDate"></param>
        /// <param name="caseClassID"></param>
        /// <returns></returns>
        public ActionResult ConditionalQuery(BsgridPage bsgridPage, string KReportDate , int caseClassID)
        {
            var items = (from tbSickperson in MyModels.B_SickpersonList
                         orderby tbSickperson.SickpersonID
                         select new Vo.Patient
                         {
                             SickpersonID = tbSickperson.SickpersonID,
                             CaseClassID = tbSickperson.CaseClassID, /*病例类型*/
                             Cardnumber = tbSickperson.Cardnumber,
                             name = tbSickperson.name,
                             IDnumber = tbSickperson.IDnumber,
                             sexID = tbSickperson.sexID,
                             workunit = tbSickperson.workunit,
                             CensusAddDetail = tbSickperson.CensusAddDetail,
                             Detailedaddress = tbSickperson.Detailedaddress,
                             ReportDate = tbSickperson.ReportDate,
                             ReportDateTime = tbSickperson.ReportDate.ToString(),
                             Remark = tbSickperson.Remark, 
                         });
            //如果查询条件不为空 
            if (!string.IsNullOrEmpty(KReportDate))
            {
                try
                {
                    DateTime dtKSOperateDate = Convert.ToDateTime(KReportDate);
                    items = items.Where(s => s.ReportDate >= dtKSOperateDate);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }

            if (caseClassID > 0)
            {
                items = items.Where(p => p.CaseClassID == caseClassID);
            }

            int intTotalRow = items.Count();//总行数
            List<Patient> notices = items.OrderByDescending(p => p.SickpersonID).//noboer表达式
               Skip(bsgridPage.GetStartIndex()).//F12（看）
               Take(bsgridPage.pageSize).
               ToList();
            Bsgrid<Patient> bsgrid = new Bsgrid<Patient>();
            bsgrid.success = true;
            bsgrid.totalRows = intTotalRow;
            bsgrid.curPage = bsgridPage.curPage;
            bsgrid.data = notices;
            return Json(bsgrid, JsonRequestBehavior.AllowGet);

        }

        #endregion

        #region 个人资料 
        /// <summary>
        /// 绑定对应的用户
        /// </summary>
        /// <returns></returns>
        public ActionResult usernameData()
        {
            //ViewData["OpenType"] = OpenType;

            try
            {
                int user = Convert.ToInt32(Session["usernameID"].ToString()); 

                var items = (from tbUsername in MyModels.B_UsernameList
                             join tbUserrole in MyModels.S_UserroleList on tbUsername.UserroleID equals tbUserrole.UserroleID
                             where tbUsername.usernameID == user
                             select new 
                             {
                                 usernameID = tbUsername.usernameID,
                                 username = tbUsername.username,
                                 IDnumber = tbUsername.IDnumber,
                                 location = tbUsername.location,
                                 UserroleID = tbUserrole.UserroleID,
                                 Userrole = tbUserrole.Userrole,
                                 name = tbUsername.name,
                                 phonenumber = tbUsername.phonenumber,
                                 postbox = tbUsername.postbox,
                               
                             }).Single();

                if (items != null )
                {
                    ViewBag.usernameID = user;
                    ViewBag.username = items.username;
                    ViewBag.IDnumber = items.IDnumber;
                    ViewBag.location = items.location;
                    ViewBag.Userrole = items.Userrole;
                    ViewBag.name = items.name;
                    ViewBag.phonenumber = items.phonenumber;
                    ViewBag.postbox = items.postbox;
                }   

            }
            catch (Exception)
            {
                return Redirect("/index/Erro");
            }
            return View(); 

        }

        /// <summary>
        /// 获取用户ID,判断浏览器缓存是否清除了
        /// </summary>
        /// <returns></returns>
        public ActionResult getUserID()
        {
            //string usernameID = Utils.GetCookie("ChronicGeographicInformationProscenium", "usernameID").ToString().Trim();

            string usernameID =(Session["usernameID"].ToString());

            if (usernameID == null)
            {
                usernameID = "0";
            }
            else if (usernameID == "")
            {
                usernameID = "0";
            }
            else
            {
                int j = 0;
                if (int.TryParse(usernameID, out j))
                {
                    usernameID = j.ToString();
                }
                else
                {
                    usernameID = "0";
                }
            }
            return Content(usernameID);
        }

        /// <summary>
        /// 修改用户资料
        /// </summary>
        /// <param name="phone"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        public ActionResult UpdateUser(string phone, string email)
        {
            string Resut = "";//返回状态文本
            int count = 0;
            try
            {  
                //修改用户资料

                int usernameID =Convert.ToInt32 (Session["usernameID"].ToString());  

                var UserData = MyModels.B_UsernameList.Find(usernameID);

                if (UserData != null)//不等于null才修改
                {
                    if (UserData.phonenumber.Trim() != phone.Trim())
                    {
                        UserData.phonenumber = phone;
                        count++;
                    }
                    if (UserData.postbox.Trim() != email.Trim())
                    {
                        UserData.postbox = email;
                        count++;
                    }
                  
                    if (MyModels.SaveChanges() > 0)//提交修改
                    {
                        Resut = "ok";
                    }
                    else
                    {
                        if (count <= 0)//判断内容是否没有更改也提示修改成功
                        {
                            Resut = "ok";//修改成功
                        }
                        else
                        {
                            Resut = "no";//修改失败
                        }
                    }
                }
                else
                {//查询不到用户信息
                    Resut = "no";
                }
            }
            catch (Exception ex)
            {//修改异常
                Resut = "no";
                string str = ex.Message;
            }

            return Json(Resut, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改用户密码
        /// </summary>
        /// <param name="OldPassword"></param>
        /// <param name="NewPassword"></param>
        /// <param name="strUserID"></param>
        /// <returns></returns>
        public ActionResult UpdatePassword(string OldPassword, string NewPassword, string strUserID)
        {
            string Resut = "no";//返回状态
            int intUserID = 0;
            if (int.TryParse(strUserID, out intUserID))//判断用户ID是否是int类型
            {
                if (intUserID > 0)//大于0
                {
                    //修改用户密码
                    var UserData = MyModels.B_UsernameList.Find(intUserID);//查询要修改的用户

                    //加密旧密码
                    string strEncryptionPaw = FormsAuthentication.HashPasswordForStoringInConfigFile(OldPassword.Trim(), "MD5");
                    strEncryptionPaw = FormsAuthentication.HashPasswordForStoringInConfigFile(strEncryptionPaw.Trim(), "MD5");
                    if (UserData.UniformAuthenticationCode == strEncryptionPaw)//判断旧密码是否等于数据库的密码
                    {//密码相等
                        //加密新密码
                        string strEncryptionPaw2 = FormsAuthentication.HashPasswordForStoringInConfigFile(NewPassword.Trim(), "MD5");
                        strEncryptionPaw2 = FormsAuthentication.HashPasswordForStoringInConfigFile(strEncryptionPaw2.Trim(), "MD5");
                        UserData.UniformAuthenticationCode = strEncryptionPaw2;//赋值修改
                        if (MyModels.SaveChanges() > 0)
                        {//修改成功
                            Resut = "ok";
                        }
                        else
                        {//修改失败
                            Resut = "no";
                        }
                    }
                    else
                    {//旧密码不相等
                        Resut = "no";
                    }
                }
                else
                {//用户ID不大于0
                    Resut = "no";
                }
            }
            else
            {//用户ID不是Iint类型
                Resut = "no";
            }
            return Json(Resut, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// 修改密码时验证当前密码是否输入正确
        /// </summary>
        /// <param name="usernameID"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public ActionResult judgeOddPassword(int usernameID, string password)
        {
            string status = "no";//返回状态
            //加密验证
            string strEncryptionPaw = FormsAuthentication.HashPasswordForStoringInConfigFile(password.Trim(), "MD5");
            strEncryptionPaw = FormsAuthentication.HashPasswordForStoringInConfigFile(strEncryptionPaw.Trim(), "MD5");
            var dbUser = MyModels.B_UsernameList.Where(m => m.usernameID == usernameID && m.UniformAuthenticationCode == strEncryptionPaw).ToList();//匹配查询
            if (dbUser.Count > 0)
            {
                status = "ok"; //验证成功
            }
            return Json(status, JsonRequestBehavior.AllowGet);
        } 

        /// <summary>
        /// 错误界面
        /// </summary>
        /// <returns></returns>
        public ActionResult Erro()
        {
            return View();
        }


        //登录验证
        public ActionResult LoginChecking(string strName, string strPassword)
        {
            try
            {
                if (strName.Trim() == "")
                {
                    return Content("1");//请输入用户名！
                }
                else if (strPassword.Trim() == "")
                {
                    return Content("2");//请输入密码！
                }
                else
                {
                    //MD5加密
                    string strEncryptionPaw = FormsAuthentication.HashPasswordForStoringInConfigFile(strPassword.Trim(), "MD5");
                    strEncryptionPaw = FormsAuthentication.HashPasswordForStoringInConfigFile(strEncryptionPaw.Trim(), "MD5");
                    var dbUser = MyModels.B_UsernameList.Where(m => m.username == strName.Trim() && m.UniformAuthenticationCode == strEncryptionPaw).ToList();//查询匹配账号和密码
                    if (dbUser.Count > 0)//匹配数量大于0
                    {
                        var dbPolice = MyModels.S_UserroleList.Find(dbUser[0].UserroleID);//查询警员信息

                        Utils.WriteCookie("NanshanDistrictFire", "username", strName.Trim());//存储用户账号
                        Utils.WriteCookie("NanshanDistrictFire", "password", strEncryptionPaw);//存储用户密码
                        Utils.WriteCookie("NanshanDistrictFire", "usernameID", dbUser[0].usernameID.ToString());//存储用户ID
                        Utils.WriteCookie("NanshanDistrictFire", "UserroleID", dbPolice.UserroleID.ToString());//存储警员ID


                        Session["usernameID"] = dbUser[0].usernameID;//存储用户ID
                        Session["username"] = strName.Trim();//存储用户账号
                        Session["password"] = strPassword.Trim();//存储用户密码

                        Session["Userrole"] = dbPolice.Userrole;//存储用户名称          
                        Utils.WriteCookie("ChronicGeographicInformationProscenium", "Userrole", dbPolice.Userrole.ToString());//存储警员ID                  
                     
                        return Content("ok");

                    }
                    else
                    {
                        return Content("3");//账号或者密码错误！
                    }
                }
            }
            catch (Exception ex)
            {
                string str = ex.Message;
                return Content("4");//登录出错！
            }
        }


        #endregion    

        #region 查询地图url

        public ActionResult getMapUrl()
        {
            var dbMapUrl = MyModels.S_UrlList.ToList();
            return Json(dbMapUrl, JsonRequestBehavior.AllowGet);
        }

        #endregion    

        #region 墨卡托
        /// <summary>
        /// 墨卡托
        /// </summary>
        /// <returns></returns>
        public ActionResult MoKaTuo()
        {
            return View();
        }
        #endregion              
     
    }
}