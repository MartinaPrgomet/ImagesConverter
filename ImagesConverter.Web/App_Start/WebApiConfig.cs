using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;

namespace ImagesConverter.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("ImagesGetAll", "api/images", new { controller = "ImagesApi", action = "ImagesGetAll" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });
            config.Routes.MapHttpRoute("ImagesConvert", "api/images", new { controller = "ImagesApi", action = "ImagesConvert" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) });
        }
    }
}
