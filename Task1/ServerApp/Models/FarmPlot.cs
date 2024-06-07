using System.Collections.Generic;

namespace ServerApp.Models
{
    // Фермерська ділянка
    public class FarmPlot
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Area { get; set; }
        public string Location { get; set; }
        public List<IrrigationDevice> IrrigationDevices { get; set; }
        public List<WaterResource> WaterResources { get; set; }
    }
}
