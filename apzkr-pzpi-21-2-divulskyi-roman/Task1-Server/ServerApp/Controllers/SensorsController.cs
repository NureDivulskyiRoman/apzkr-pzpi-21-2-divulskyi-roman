using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Database;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorsController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public SensorsController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/Sensors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sensor>>> GetSensors()
        {
            return await _context.Sensors.Include(c => c.FarmPlot).ToListAsync();
        }

        // GET: api/Sensors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sensor>> GetSensor(int id)
        {
            var sensor = await _context.Sensors.FindAsync(id);

            if (sensor == null)
            {
                return NotFound();
            }

            return sensor;
        }

        // PUT: api/Sensors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSensor(int id, Sensor sensor)
        {
            if (id != sensor.Id)
            {
                return BadRequest();
            }

            _context.Entry(sensor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SensorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sensors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sensor>> PostSensor(Sensor sensor)
        {
            _context.Sensors.Add(sensor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSensor", new { id = sensor.Id }, sensor);
        }

        // DELETE: api/Sensors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSensor(int id)
        {
            var sensor = await _context.Sensors.FindAsync(id);
            if (sensor == null)
            {
                return NotFound();
            }

            _context.Sensors.Remove(sensor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SensorExists(int id)
        {
            return _context.Sensors.Any(e => e.Id == id);
        }
    }
}
