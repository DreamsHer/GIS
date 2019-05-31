using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CDGIS.Vo
{
    public class OrganizationVo
    {
        public string id { get; set; }
        public string name { get; set; }
        public bool open { get; set; }
        public bool isParent { get; set; }
        public string pId { get; set; }

        public int idp { get; set; }
    }
}