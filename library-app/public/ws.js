(() => {
    const socket = io.connect("http://localhost:3000");

    // socket.emit(
    //     "addComment",
    //     { book: "63df5a4fbcc232575ae46670", comment: "Второй коммент к книге 234" },
    //     (answer) => {
    //         console.log("getAllComments", answer);
    //     }
    // );

    socket.emit("getAllComments", { bookId: "63df5a4fbcc232575ae46670" }, (answer) => {
        console.log("getAllComments", answer);
    });
})();
