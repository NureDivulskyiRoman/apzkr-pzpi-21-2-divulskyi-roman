using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IoTApp
{
    public class WeatherCondition
    {
        public DateTime DateTime { get; set; }
        public double Temperature { get; set; }
        public double Humidity { get; set; }
        public double Rainfall { get; set; }
        public string Location { get; set; }
    }

}
