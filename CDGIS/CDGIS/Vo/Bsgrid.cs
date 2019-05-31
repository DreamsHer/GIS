using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DaXingShangMaoSystem.Vo
{
    public class  Bsgrid<T>
    {
        //orderby tbGoodsCreditDiploma.GoodsCreditDiplomaID  descending倒叙
        /// <summary>
        /// 成功否
        /// </summary>
        public bool success { get; set; }
        /// <summary>
        /// 总行数
        /// </summary>
        public int totalRows { get; set; }
        /// <summary>
        /// 当前页面
        /// </summary>
        public int curPage { get; set; }
        /// <summary>
        /// 数据
        /// </summary>
        public List<T> data { get; set; }
    }
}