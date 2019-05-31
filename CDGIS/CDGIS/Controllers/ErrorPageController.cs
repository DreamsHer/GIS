using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CDGIS.Controllers
{
    public class ErrorPageController : Controller
    {
        // GET: ErrorPage
        public ActionResult ParameterErrorPage(string errinfo)
        {
            ViewBag.errinfo = errinfo;
            return View();
        }
    }
}