using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OpenHack.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Open Hack - Minecraft";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "12";

            return View();
        }
    }
}