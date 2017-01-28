using System.Web;
using System.Web.Http;
using System.Web.Routing;
using ImagesConverter.Data.TestData;

namespace ImagesConverter.Web
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            //TestDataFactory.Fill();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
