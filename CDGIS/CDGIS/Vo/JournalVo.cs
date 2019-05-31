using CDGIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CDGIS.Vo
{
    public class JournalVo : S_JournalList
    {
        public string name { get; set; }//用户名（登录名）
        public string username { get; set; }//用户性名
        private string operateDateStr { get; set; }//操作时间
        public string OperateDateStr
        {
            set
            {
                try
                {
                    DateTime dt = Convert.ToDateTime(value);
                    operateDateStr = dt.ToString("yyyy-MM-dd HH:mm");
                }
                catch (Exception e)
                {
                    operateDateStr = value;
                }
            }
            get
            {
                return operateDateStr;
            }
        }
    }
}