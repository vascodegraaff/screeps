var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var roleLDHarvester = require("role.LDharvester");
var roleClaimer = require("role.claimer");
require("prototype.spawn")();

global.HOME = "W4S22";
module.exports.loop = function() {
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == "upgrader") {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == "builder") {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == "repairer") {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == "LDharvester") {
            roleLDHarvester.run(creep);
        }
        if (creep.memory.role == "claimer") {
            roleClaimer.run(creep);
        }
    }

    var towers = Game.rooms[HOME].find(FIND_STRUCTURES, {
        filter: s => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }

    for (let spawnName in Game.spawns) {
        let spawn = Game.spawns[spawnName]
        let creepsInRoom = spawn.room.find(FIND_CREEPS);

        var minimumLDHarvester = 0;

        var sumHarvesters = _.sum(
            creepsInRoom,
            creep => creep.memory.role == "harvester"
        );
        var sumUpgraders = _.sum(
            creepsInRoom,
            creep => creep.memory.role == "upgrader"
        );
        var sumBuilders = _.sum(
            creepsInRoom,
            creep => creep.memory.role == "builder"
        );
        var sumRepairers = _.sum(
            creepsInRoom,
            creep => creep.memory.role == "repairer"
        );
        var sumLDHarvester = _.sum(
            Game.creeps,
            creep => creep.memory.role == "LDharvester"
        );

        var energy = spawn.room.energyCapacityAvailable;
        var newCreep = undefined;

        if (sumHarvesters < spawn.memory.minHarvesters) {
            newCreep = spawn.createCustomCreep(energy, "harvester");
            if (newCreep == ERR_NOT_ENOUGH_ENERGY && sumHarvesters == 0) {
                newcreep = spawn.createCustomCreep(
                    spawn.room.energyAvailable,
                    "harvester"
                );
            }
        } else if (spawn.memory.claimRoom != undefined) {
            newCreep = spawn.createClaimerCreep(
                spawn.memory.claimRoom
            );
            console.log(newCreep);
            if (!(newCreep < 0)) {
                delete spawn.memory.claimRoom;
            }
        } else if (sumUpgraders < spawn.memory.minUpgraders) {
            newCreep = spawn.createCustomCreep(energy, "upgrader");
        } else if (sumBuilders < spawn.memory.minBuilders) {
            newCreep = spawn.createCustomCreep(energy, "builder");
        } else if (sumRepairers < spawn.memory.minRepairers) {
            newCreep = spawn.createCustomCreep(energy, "repairer");
        } else if (sumLDHarvester < minimumLDHarvester) {
            newCreep = spawn.createLDHarvester(
                energy,
                1,
                Game.spawns["Home"].room.name,
                "W5S22",
                0
            );
        } else {
            newCreep = spawn.createCustomCreep(energy, "upgrader");
        }
        if (!(newCreep < 0)) {
            console.log("New creep: " + newCreep + '(' + Game.creeps[newCreep].memory.role +')');
        }
        if (Game.time % 20 == 0) {
            console.log(
                "number of harvesters: " +
                    sumHarvesters +
                    ", number of upgraders: " +
                    sumUpgraders +
                    ", number of builders: " +
                    sumBuilders +
                    ", number of repairers: " +
                    sumRepairers +
                    ", number of LDharvester: " +
                    sumLDHarvester
            );
        }
    }
};
