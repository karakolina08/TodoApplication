using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoAppServer.Models.ViewModels
{
    public class TodoVM
    {
        public int? Id { get; set; }
        public int TdUserId { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public int Priority { get; set; } // 1 - high, 2 - Normal,  3 - Low
        public bool? IsCompleted { get; set; }
        public string PriorityDescription { get { return this.Priority == 1 ? "High" : this.Priority == 2 ? "Normal" : "Low"; } }
    }
}
