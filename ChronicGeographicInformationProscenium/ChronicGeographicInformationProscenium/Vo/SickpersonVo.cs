using ChronicGeographicInformationProscenium.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChronicGeographicInformationProscenium.Vo
{
    public class SickpersonVo  : B_SickpersonList
    {

        public int SickpersonDetailID { get; set; }
        public int BaseDetailID { get; set; }

        public string BaseDetailName { get; set; }

        /// <summary>
        /// 出生日期
        /// </summary>
        private string birthday { get; set; }
        public string Birthdays
        {
            set
            {
                try
                {
                    DateTime dt = Convert.ToDateTime(value);
                    birthday = dt.ToString("yyyy-MM-dd");
                }
                catch (Exception)
                {
                    birthday = value;
                }
            }
            get
            {
                return birthday;
            }
        }

    }
}