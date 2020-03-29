var roleLDHarvester = {
    run: function(creep) {
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        } else if (creep.carry.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            if (creep.room.name == creep.memory.home) {
                var structure = creep.pos.findClosestByPath(
                    FIND_MY_STRUCTURES,
                    {
                        filter: s =>
                            (s.structureType == STRUCTURE_SPAWN ||
                                s.structureType == STRUCTURE_EXTENSION ||
                                s.structureType == STRUCTURE_TOWER) &&
                            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                );
                if (structure != undefined) {
                    if (
                        creep.transfer(structure, RESOURCE_ENERGY) ==
                        ERR_NOT_IN_RANGE
                    ) {
                        creep.moveTo(structure);
                    }
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        } else {
            if (
                creep.room.name == creep.memory.target &&
                creep.store.getFreeCapacity() != 0
            ) {
                if (creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES) == 0) {
                    var source = creep.room.find(FIND_SOURCES)[
                        creep.memory.sourceIndex
                    ];
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                } else {
                    const target = creep.pos.findClosestByRange(
                        FIND_DROPPED_RESOURCES
                    );
                    if (target) {
                        if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};
module.exports = roleLDHarvester;
