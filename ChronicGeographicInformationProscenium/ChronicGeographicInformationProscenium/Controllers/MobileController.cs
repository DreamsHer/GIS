using ChronicGeographicInformationProscenium.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChronicGeographicInformationProscenium.Controllers
{
    public class MobileController : Controller
    {
        // GET: Mobile
        ChronicGeographicInformationSystemEntities myChronicGeographicInformationSystemEntities = new ChronicGeographicInformationSystemEntities();
        public ActionResult Index()
        {
            return View();
        }
    }
}