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
    public class IrrigationDevicesController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public IrrigationDevicesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/IrrigationDevices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IrrigationDevice>>> GetIrrigationDevices()
        {
            return await _context.IrrigationDevices.Include(c => c.FarmPlot).ToListAsync();
        }

        // GET: api/IrrigationDevices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IrrigationDevice>> GetIrrigationDevice(int id)
        {
            var irrigationDevice = await _context.IrrigationDevices.FindAsync(id);

            if (irrigationDevice == null)
            {
                return NotFound();
            }

            return irrigationDevice;
        }

        // PUT: api/IrrigationDevices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIrrigationDevice(int id, IrrigationDevice irrigationDevice)
        {
            if (id != irrigationDevice.Id)
            {
                return BadRequest();
            }

            _context.Entry(irrigationDevice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IrrigationDeviceExists(id))
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

        // POST: api/IrrigationDevices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IrrigationDevice>> PostIrrigationDevice(IrrigationDevice irrigationDevice)
        {
            _context.IrrigationDevices.Add(irrigationDevice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIrrigationDevice", new { id = irrigationDevice.Id }, irrigationDevice);
        }

        // DELETE: api/IrrigationDevices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIrrigationDevice(int id)
        {
            var irrigationDevice = await _context.IrrigationDevices.FindAsync(id);
            if (irrigationDevice == null)
            {
                return NotFound();
            }

            _context.IrrigationDevices.Remove(irrigationDevice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IrrigationDeviceExists(int id)
        {
            return _context.IrrigationDevices.Any(e => e.Id == id);
        }
    }
}
