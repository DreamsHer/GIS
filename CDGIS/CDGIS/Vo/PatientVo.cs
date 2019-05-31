using CDGIS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CDGIS.Vo
{
    public class PatientVo  : B_SickpersonList
    {
        //性别
        public string Sex { get; set; }

        //病人所属
        public string PatientOwnership { get; set; }

        //人群分类
        public string CrowdClass { get; set; }

        //
        //病例分类
        public string CaseClass { get; set; }

        //疾病名称类型
        public string DiseaseType { get; set; }

        //审核状态
        public string AuditStatus { get; set; }

        //日期的重写
        private string releaseTimeStr;
        ///重写字符串
        /// 
        /// 时间重写
        /// 

        //出生日期

        public string BirthDateTime
        {
            set
            {
                try
                {
                    DateTime dt = Convert.ToDateTime(value);
                    releaseTimeStr = dt.ToString("yyyy-MM-dd");
                }
                catch (Exception)
                {

                    releaseTimeStr = value;
                }
            }
            get
            {
                return releaseTimeStr;
            }
        }

        //发病日期
        private string MorbidityDateTimeStr;
        public string MorbidityDateTime
        {
            set
            {
                try
                {
                    DateTime dt = Convert.ToDateTime(value);
                    MorbidityDateTimeStr = dt.ToString("yyyy-MM-dd");
                }
                catch (Exception)
                {

                    MorbidityDateTimeStr = value;
                }
            }
            get
            {
                return MorbidityDateTimeStr;
            }
        }

        //诊断日期

        private string DiagnoseDateStr;
        public string DiagnoseDateTime
        {
            set
            {
                try
                {
                    DateTime dt = Convert.ToDateTime(value);
                    DiagnoseDateStr = dt.ToString("yyyy-MM-dd");
                }
                catch (Exception)
                {

                    DiagnoseDateStr = value;
                }
            }
            get
            {
                return DiagnoseDateStr;
            }
        }

        //录入日期

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


        //订正终审日期

        private string RevisedDateStr;
        public string RevisedDateTime
        {
            set
            {
                try
                {
                    DateTime dt = Convert.ToDateTime(value);
                    RevisedDateStr = dt.ToString("yyyy-MM-dd");
                }
                catch (Exception)
                {

                    RevisedDateStr = value;
                }
            }
            get
            {
                return RevisedDateStr;
            }
        }
    }
}