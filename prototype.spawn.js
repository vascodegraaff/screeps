//todo adjust spawn logic
module.exports = function() {
    //harvester body type should be different than upgrader, builder and repairer body parts

    StructureSpawn.prototype.createCustomCreep = function(energy, roleName) {
        var n = Math.floor((energy-200) / 150);
        var body = [MOVE,MOVE];
        for (let i = 0; i < n; i++){
            body.push(WORK,CARRY)
        }
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
        var body = [WORK,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
/*         for (let i = 0; i < numberOfWorkParts; i++) {
            body.push(WORK);
        }
        energy -= 100 * numberOfWorkParts;
        var numberofParts = Math.floor(energy / 150);
        for (let i = 0; i < numberofParts; i++) {
            body.push(CARRY,CARRY,MOVE);
        } */
        return this.createCreep(body, undefined, {
            role: "LDharvester",
            working: false,
            home: home,
            target: target,
            sourceIndex: sourceIndex,
        });
    };
    StructureSpawn.prototype.createClaimerCreep = function(target) {
        return this.createCreep([CLAIM, MOVE], undefined, {role: 'claimer', target: target});
    };
    StructureSpawn.prototype.createAttackerCreep = function(target) {
        return this.createCreep([ATTACK,ATTACK,MOVE,MOVE], undefined, {role: 'attacker', target: target})
    }
};
