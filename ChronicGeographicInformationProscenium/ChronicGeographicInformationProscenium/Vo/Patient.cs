using ChronicGeographicInformationProscenium.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChronicGeographicInformationProscenium.Vo
{
    public class Patient : B_SickpersonList
    {
        private string ReportDateStr;
        public string ReportDateTime
        {
            set
            {
                try
                {
                    DateTime dt = Convert.ToDateTime(value);
                    ReportDateStr = dt.ToString("yyyy-MM-dd");
                }
                catch (Exception)
                {

                    ReportDateStr = value;
                }
            }
            get
            {
                return ReportDateStr;
            }
        }


    }
}