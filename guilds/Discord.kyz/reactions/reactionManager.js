module.exports = class reactionManager {

    static async addRole(memberRoleData, memberRole, roleID) {
        if (!memberRoleData.has(roleID)) {
            await memberRole.add(roleID).catch(()=>{})
        }
    }

    static async removeRole(memberRoleData, memberRole, roleID){
        if (memberRoleData.has(roleID)) {
            await memberRole.remove(roleID).catch(()=>{})
        }
    }
}