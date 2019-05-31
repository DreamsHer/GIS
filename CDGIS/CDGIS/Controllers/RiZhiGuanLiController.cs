using CDGIS.Vo;
using DaXingShangMaoSystem.Vo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CDGIS.Controllers
{
    public class RiZhiGuanLiController : Controller
    {
        // GET: RiZhiGuanLi
        Models.ChronicGeographicInformationSystemEntities MyModels = new Models.ChronicGeographicInformationSystemEntities();
        /// <summary>
        /// 日志管理
        /// </summary>
        /// <returns></returns>
        public ActionResult RiZhiGuanLi()
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
        /// 查询日志
        /// </summary>
        /// <param name="bsgridPage"></param>
        /// <param name="username"></param>
        /// <param name="KSOperateDate"></param>
        /// <param name="JSOperateDate"></param>
        /// <returns></returns>
        public ActionResult SelectJournal(BsgridPage bsgridPage, string username, string KSOperateDate, string JSOperateDate)
        {
            int usernameid = Convert.ToInt32(Session["usernameID"].ToString());
            var linqItem = from tbJournal in MyModels.S_JournalList
                           join tbUser in MyModels.B_UsernameList on tbJournal.usernameID equals tbUser.usernameID
                           orderby tbJournal.JournalID descending
                           where tbJournal.usernameID == usernameid
                           select new JournalVo
                           {
                               JournalID = tbJournal.JournalID,
                               name = tbUser.name,
                               username = tbUser.username,
                               Operate = tbJournal.Operate,
                               OperateDate = tbJournal.OperateDate,
                               OperateDateStr = tbJournal.OperateDate.ToString()
                           };
            if (!string.IsNullOrEmpty(username))
            {
                linqItem = linqItem.Where(s => s.username.Contains(username.Trim()));
            }
            if (!string.IsNullOrEmpty(KSOperateDate) && !string.IsNullOrEmpty(JSOperateDate))
            {
                try
                {
                    DateTime dtKSOperateDate = Convert.ToDateTime(KSOperateDate);
                    DateTime dtJSOperateDate = Convert.ToDateTime(JSOperateDate);
                    linqItem = linqItem.Where(s => s.OperateDate >= dtKSOperateDate && s.OperateDate <= dtJSOperateDate);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
            int TotalRow = linqItem.Count();
            List<JournalVo> listContainer = linqItem.Skip(bsgridPage.GetStartIndex()).Take(bsgridPage.pageSize).ToList();
            Bsgrid<JournalVo> bsgrid = new Bsgrid<JournalVo>
            {
                success = true,
                totalRows = TotalRow,
                curPage = bsgridPage.curPage,
                data = listContainer
            };
            return Json(bsgrid, JsonRequestBehavior.AllowGet);
        }

    }
}