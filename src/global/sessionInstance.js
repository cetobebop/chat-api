export const sessionInstance = {
    activeUsers: [],

    setUser(user){
        this.activeUsers.push(user)
    },
    removeUser(sessionId){
        this.activeUsers = this.activeUsers.filter(a => a.sessionId !== sessionId)
    },
    getUsers(){
        return this.activeUsers;
    },
    getTotal(){
        return this.activeUsers.length
    }
}