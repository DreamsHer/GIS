using ChronicGeographicInformationProscenium.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChronicGeographicInformationProscenium.Vo
{
    public class SickpersonRajectoryrVo : S_SickpersonRajectoryrList
    {
        /// <summary>
        /// 结束日期
        /// </summary>
        private string ActivityTimers { get; set; }
        public string ActivityTimes
        {
            set
            {
                try
                {
                    DateTime dt = Convert.ToDateTime(value);
                    ActivityTimers = dt.ToString("yyyy-MM-dd HH:mm:ss");
                }
                catch (Exception)
                {
                    ActivityTimers = value;
                }
            }
            get
            {
                return ActivityTimers;
            }
        }
    }
}