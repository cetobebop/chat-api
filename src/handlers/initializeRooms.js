export async function initializeRooms(socket, user) {

    await user.populate([
        {
            path: 'chatGroups',
            populate:
            [{ 
                path: 'users', 
                select: '-nanoId',
            },
            {
                path: 'msg',
                perDocumentLimit: 1,
                options: { 
                    sort:'-createdAt' 
                }
            }]
        },
        
    ])
  
    const rooms = user.chatGroups

   
    socket.join(user.nanoId.toString())
    rooms.forEach(room => {
        socket.join("room:" + room._id.toString())
    });

    socket.emit("server:my-rooms", rooms)
}