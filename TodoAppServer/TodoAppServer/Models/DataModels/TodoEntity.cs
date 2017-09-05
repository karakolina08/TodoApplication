using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TodoAppServer.Models.DataModels
{
    [Table("Td_Todo")]
    public class TodoEntity
    {
        [Key]
        public int Id { get; set; }
        public int TdUserId { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public int Priority { get; set; } // 1 - high, 2 - Normal,  3 - Low
        public bool? IsCompleted { get; set; }
    }
}
