var roleUpgrader = require("role.upgrader");
var roleHarvester = {
    run: function(creep) {
        if (creep.memory.target != undefined && creep.room.name != creep.memory.target){
            var exit = creep.room.findExitTo(creep.memory.target)
            creep.moveTo(creep.pos.findClosestByRange(exit))
        }
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (
            creep.memory.working == false &&
            creep.carry.energy == creep.carryCapacity
        ) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            // try to transfer energy, if the spawn is not in range
            var constructionSite = creep.pos.findClosestByPath(
                FIND_CONSTRUCTION_SITES
            );
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the spawn and transfers energy to the spanw
                    creep.moveTo(constructionSite);
                }
            } else {
                roleUpgrader.run(creep);
            }
        } else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};

module.exports = roleHarvester;
