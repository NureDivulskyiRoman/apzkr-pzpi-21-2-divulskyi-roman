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
    public class IrrigationSchedulesController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public IrrigationSchedulesController(DataBaseContext context)
        {
            _context = context;
        }

        // GET: api/IrrigationSchedules
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IrrigationSchedule>>> GetIrrigationSchedules()
        {
            return await _context.IrrigationSchedules.Include(c => c.IrrigationDevice).ToListAsync();
        }

        // GET: api/IrrigationSchedules/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IrrigationSchedule>> GetIrrigationSchedule(int id)
        {
            var irrigationSchedule = await _context.IrrigationSchedules.FindAsync(id);

            if (irrigationSchedule == null)
            {
                return NotFound();
            }

            return irrigationSchedule;
        }

        // PUT: api/IrrigationSchedules/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIrrigationSchedule(int id, IrrigationSchedule irrigationSchedule)
        {
            if (id != irrigationSchedule.Id)
            {
                return BadRequest();
            }

            _context.Entry(irrigationSchedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IrrigationScheduleExists(id))
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

        // POST: api/IrrigationSchedules
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<IrrigationSchedule>> PostIrrigationSchedule(IrrigationSchedule irrigationSchedule)
        {
            _context.IrrigationSchedules.Add(irrigationSchedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIrrigationSchedule", new { id = irrigationSchedule.Id }, irrigationSchedule);
        }

        // DELETE: api/IrrigationSchedules/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIrrigationSchedule(int id)
        {
            var irrigationSchedule = await _context.IrrigationSchedules.FindAsync(id);
            if (irrigationSchedule == null)
            {
                return NotFound();
            }

            _context.IrrigationSchedules.Remove(irrigationSchedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IrrigationScheduleExists(int id)
        {
            return _context.IrrigationSchedules.Any(e => e.Id == id);
        }
    }
}
