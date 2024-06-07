using System;

namespace ServerApp.Models
{
    // Інформація про погодні умови
    public class WeatherCondition
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public double Temperature { get; set; }
        public double Humidity { get; set; }
        public double Rainfall { get; set; }
        public string Location { get; set; }
    }
}
