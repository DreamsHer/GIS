using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChronicGeographicInformationProscenium.Vo
{
    public class SelectVo
    {
        public int id { get; set; }

        public string text { get; set; }


        private string startTime;
        public string StartTime
        {
            get
            {
                return startTime;
            }
            set
            {
                try
                {
                    startTime = Convert.ToDateTime(value).ToString("yyyy-MM-dd");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    startTime = value;
                }
            }
        }

        private string finalTime;
        public string FinalTime
        {
            get
            {
                return finalTime;
            }
            set
            {
                try
                {
                    finalTime = Convert.ToDateTime(value).ToString("yyyy-MM-dd");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    finalTime = value;
                }
            }
        }
    }
}