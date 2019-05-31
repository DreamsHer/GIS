using DaXingShangMaoSystem.Vo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CDGIS.Common
{
    public class Tools
    {
        public static List<SelectVo> SetSelectJson(List<SelectVo> seletce)
        {
            List<SelectVo> list = new List<SelectVo>();
            SelectVo selectVo = new SelectVo
            {
                id = 0,
                text = "---请选择---"
            };
            list.Add(selectVo);
            list.AddRange(seletce);
            return list;
        }
    }
}