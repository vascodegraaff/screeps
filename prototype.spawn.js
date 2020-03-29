//todo adjust spawn logic
module.exports = function() {
    StructureSpawn.prototype.createCustomCreep = function(energy, roleName) {
        var numberofParts = Math.floor(energy / 200);
        var body = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
        return this.createCreep(body, undefined, {
            role: roleName,
            working: false
        });
    };
    StructureSpawn.prototype.createLDHarvester = function(
        energy,
        numberOfWorkParts,
        home,
        target,
        sourceIndex
    ) {
        var body = [];
        for (let i = 0; i < numberOfWorkParts; i++) {
            body.push(WORK);
        }
        energy -= 150 * numberOfWorkParts;
        var numberofParts = Math.floor(energy / 100);
        for (let i = 0; i < numberofParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberofParts + numberOfWorkParts; i++) {
            body.push(MOVE);
        }
        return this.createCreep(body, undefined, {
            role: "LDharvester",
            working: "false",
            home: home,
            target: target,
            sourceIndex: sourceIndex,
        });
    };
    StructureSpawn.prototype.createClaimerCreep = function(target) {
        return this.createCreep([CLAIM, MOVE], undefined, {role: 'claimer', target: target});
    };
};
