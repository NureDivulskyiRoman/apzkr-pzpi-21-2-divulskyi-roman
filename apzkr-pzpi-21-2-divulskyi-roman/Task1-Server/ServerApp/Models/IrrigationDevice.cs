namespace ServerApp.Models
{
    // Пристрої зрошення
    public class IrrigationDevice
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public double WaterFlowRate { get; set; }
        public string Status { get; set; }
        public int FarmPlotId { get; set; }
        public FarmPlot FarmPlot { get; set; }
    }
}
