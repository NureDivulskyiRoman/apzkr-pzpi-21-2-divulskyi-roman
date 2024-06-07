namespace ServerApp.Models
{
    public class Sensor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Location { get; set; }
        public int FarmPlotId { get; set; }
        public FarmPlot FarmPlot { get; set; }
    }
}
