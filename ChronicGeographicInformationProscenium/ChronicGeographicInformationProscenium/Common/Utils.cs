using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace ChronicGeographicInformationProscenium.Common
{
    public class Utils
    {
        #region 获取随机数
        /// <summary>
        /// 获取随机数
        /// </summary>
        /// <param name="intLength">随机数的长度</param>
        /// <returns></returns>
        public static string GetRandomCode(int intLength)
        {
            /*产生数字和密码混合的随机数*/
            string strReturn = string.Empty;
            Random random = new Random();//最小值：当前时间的毫秒数
            for (int i = 0; i < intLength; i++)
            {
                char cRerult;
                int intRandom = random.Next();
                /*根据当前随机数来确定字符串*/
                //intRandom % 3 获取的是intRandom/3  得到的余数
                if (intRandom % 3 == 0)
                {

                    //产生数字
                    //位数来产生数字
                    cRerult = (char)(0x30 + (intRandom % 10));

                }
                else if (intRandom % 3 == 1)
                {
                    //位数产生大写字母:大写字符 65-97 A 65
                    //68 D  25 Z

                    cRerult = (char)(0x41 + (intRandom % 0x1a));

                }
                else
                {
                    //余数为2
                    //产生小写字母 98-116

                    cRerult = (char)(0x61 + (intRandom % 0x1a));
                }

                strReturn += cRerult.ToString();
            }

            return strReturn;
        }
        #endregion

        #region 绘制验证码
        /// <summary>
        /// 绘制验证码
        /// </summary>
        /// <param name="strRandom">随机数</param>
        /// <returns></returns>
        public static byte[] CreateImage(string strRandom)
        {
            //新增图片
            Bitmap newBitmap = new Bitmap(strRandom.Length * 25, 30);//设置字符的长宽

            Graphics g = Graphics.FromImage(newBitmap);
            g.Clear(Color.White);//设置图片的背景颜色



            //在图片上绘制文字
            SolidBrush sb = new SolidBrush(Color.Blue);//设置画笔的颜色
            g.DrawString(strRandom, new Font("hakuyoxingshu7000", 25), sb, 2, -4);//叶根友非主流手
            //在图片上绘制线
            Random random = new Random();
            for (int i = 0; i < 5; i++)
            {
                //产生一条线，并绘制到画布。 起始点（x,y）  总结点
                int x1 = random.Next(newBitmap.Width);//小于背景的宽度，random.Next(0,newBitmap.Width);
                int x2 = random.Next(newBitmap.Width);
                int y1 = random.Next(newBitmap.Height);
                int y2 = random.Next(newBitmap.Height);
                g.DrawLine(new Pen(Color.DodgerBlue), x1, y1, x2, y2);
            }
            //在图片上绘制点
            //画图片的前景干扰点
            for (int i = 0; i < 80; i++)
            {
                int x = random.Next(newBitmap.Width);
                int y = random.Next(newBitmap.Height);
                newBitmap.SetPixel(x, y, Color.FromArgb(random.Next()));
            }
            //在最外边绘制边框
            g.DrawRectangle(new Pen(Color.Blue), 0, 0, newBitmap.Width - 1, newBitmap.Height - 1);
            MemoryStream ms = new MemoryStream();
            newBitmap.Save(ms, ImageFormat.Png);

            return ms.ToArray();//转换为type类型
        }
        #endregion

        #region 读取或写入Cookie

        #region 写入Cookie
        /// <summary>
        /// 写cookie值
        /// </summary>
        /// <param name="strName">名称</param>
        /// <param name="strValue">值</param>
        public static void WriteCookie(string strName, string strValue)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[strName];//发出请求
            if (cookie == null)//如果不存在的话就新增一个
            {
                cookie = new HttpCookie(strName);
            }
            cookie.Value = HttpContext.Current.Server.UrlEncode(strValue);//赋值
            cookie.Expires = DateTime.Now.AddDays(7);//设置存活时间
            HttpContext.Current.Response.AppendCookie(cookie);
        }

        /// <summary>
        /// 写cookie值
        /// </summary>
        /// <param name="strName">名称</param>
        /// <param name="strValue">值</param>
        public static void WriteCookie(string strName, string key, string strValue)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[strName];//发出请求
            if (cookie == null)//如果不存在的话就新增一个
            {
                cookie = new HttpCookie(strName);
            }
            cookie[key] = HttpContext.Current.Server.UrlEncode(strValue);//赋值
            cookie.Expires = DateTime.Now.AddDays(7);//设置存活时间
            HttpContext.Current.Response.AppendCookie(cookie);
        }

        /// <summary>
        /// 写cookie值
        /// </summary>
        /// <param name="strName">名称</param>
        /// <param name="strValue">值</param>
        public static void WriteCookie(string strName, string key, string strValue, int expires)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[strName];//发出请求
            if (cookie == null)//如果不存在的话就新增一个
            {
                cookie = new HttpCookie(strName);
            }
            cookie[key] = HttpContext.Current.Server.UrlEncode(strValue);//赋值
            cookie.Expires = DateTime.Now.AddDays(expires);//设置存活时间
            HttpContext.Current.Response.AppendCookie(cookie);
        }

        /// <summary>
        /// 写cookie值
        /// </summary>
        /// <param name="strName">名称</param>
        /// <param name="strValue">值</param>
        /// <param name="strValue">过期时间(分钟)</param>
        public static void WriteCookie(string strName, string strValue, int expires)
        {
            HttpCookie cookie = HttpContext.Current.Request.Cookies[strName];//发出请求
            if (cookie == null)//如果不存在的话就新增一个
            {
                cookie = new HttpCookie(strName);
            }
            cookie.Value = HttpContext.Current.Server.UrlEncode(strValue);//赋值
            cookie.Expires = DateTime.Now.AddMinutes(expires);//设置存活时间
            HttpContext.Current.Response.AppendCookie(cookie);
        }
        #endregion

        #region 读取cookie
        /// <summary>
        /// 读cookie值
        /// </summary>
        /// <param name="strName">名称</param>
        /// <returns>cookie值</returns>
        public static string GetCookie(string strName)
        {
            if (HttpContext.Current.Request.Cookies != null && HttpContext.Current.Request.Cookies[strName] != null)
            {
                return HttpContext.Current.Server.UrlDecode(HttpContext.Current.Request.Cookies[strName].Value.ToString());
            }
            else
            {
                return "";
            }
        }


        /// <summary>
        /// 读cookie值
        /// </summary>
        /// <param name="strName">名称</param>
        /// <param name="key">key</param>
        /// <returns></returns>
        public static string GetCookie(string strName, string key)
        {
            if (HttpContext.Current.Request.Cookies != null && HttpContext.Current.Request.Cookies[strName] != null && HttpContext.Current.Request.Cookies[strName][key] != null)
            {
                return HttpContext.Current.Server.UrlDecode(HttpContext.Current.Request.Cookies[strName][key].ToString());
            }
            else
            {
                return "";
            }
        }
        #endregion

        #region 修改Cookie
        /// <summary>
        /// 修改Cookie
        /// </summary>
        /// <param name="strName">名称</param>
        /// <param name="strValue">值</param>
        public static void ModCookie(string strName, string strValue)
        {
            if (HttpContext.Current.Request.Cookies != null && HttpContext.Current.Request.Cookies[strName] != null)
            {
                HttpCookie cookie = HttpContext.Current.Request.Cookies[strName];
                cookie.Value = strName;
            }
        }


        /// <summary>
        /// 修改Cookie
        /// </summary>
        /// <param name="strName">名称</param>
        /// <param name="key">key</param>
        /// <param name="strValue">值</param>
        public static void ModCookie(string strName, string key, string strValue)
        {
            if (HttpContext.Current.Request.Cookies != null && HttpContext.Current.Request.Cookies[strName] != null && HttpContext.Current.Request.Cookies[strName][key] != null)
            {
                HttpCookie cookie = HttpContext.Current.Request.Cookies[strName];
                if (cookie == null)
                {
                    cookie = new HttpCookie(strName);
                }
                cookie[key] = strName;
            }
        }


        /// <summary>
        /// 修改Cookie
        /// </summary>
        /// <param name="strName">名称</param>
        /// <param name="expires">分钟</param>
        public static void ModCookie(string strName, int expires)
        {
            if (HttpContext.Current.Request.Cookies != null && HttpContext.Current.Request.Cookies[strName] != null)
            {
                HttpCookie cookie = HttpContext.Current.Request.Cookies[strName];
                cookie.Expires = DateTime.Now.AddMinutes(expires);
            }
        }
        #endregion

        #region 删除cookie

        /// <summary>
        /// 删除cookie
        /// </summary>
        /// <param name="strName">名称</param>
        public static void DelCookie(string strName)
        {
            if (HttpContext.Current.Request.Cookies != null && HttpContext.Current.Request.Cookies[strName] != null)
            {
                HttpCookie cookie = HttpContext.Current.Request.Cookies[strName];
                cookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Request.Cookies.Add(cookie);
                HttpContext.Current.Request.Cookies.Remove(strName);
            }
        }
        #endregion

        #endregion

        public static string GetName(string strName)
        {
            return HttpContext.Current.Server.UrlDecode(strName);

        }
    }
}