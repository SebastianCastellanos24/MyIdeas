const form = document.querySelector("#form");
const tweetList = document.querySelector("#tweet-list");

let tweets = [];

eventListeners();

function eventListeners() {
    //user add tweet
    form.addEventListener("submit", addTweet);

    //document is going to ready
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        addHTML();
    })

}

function addTweet (e) {
    e.preventDefault();
    const tweet = document.querySelector("#tweet").value;
    
    if(tweet === "") {
        showError();
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }

    tweets = [...tweets, tweetObj];
    
    addHTML();

    form.reset();

}

function showError () {
    swal.fire({
        title: "Don't have ideas?",
        text: "Write your ideas, don't forget them",
        icon: "question",
        iconColor: "rgb(6 182 212)",
        confirmButtonText: 'Im going to write my idea',
        color: "rgb(6 182 212)",
        confirmButtonColor: "rgb(6 182 212)",
    });
}

function addHTML() {

    cleanHTML ();

    if(tweets.length > 0) {

        tweets.map( (tweet) => {

            const btnDelete = document.createElement("a");
            btnDelete.classList.add("text-red-500", "cursor-pointer", "font-bold", "text-xl", "w-1/12", "text-center", "ml-3");
            btnDelete.innerText = "X";

            btnDelete.onclick = () => {
                swal.fire({
                    title: "Do you want delete this idea?",
                    color: "rgb(6 182 212)",
                    icon: "question",
                    iconColor: "rgb(6 182 212)",
                    showDenyButton: true,
                    confirmButtonText: "Delete",
                    confirmButtonColor: "rgb(239 68 68)",
                    denyButtonText: "Don't delete",
                    denyButtonColor: "rgb(34 197 94)"
                }).then((result) => {
                    if(result.isConfirmed) {
                        deleteTweet(tweet.id);
                        Swal.fire({
                            title: "You just deleted an idea",
                            color: "rgb(6 182 212)",
                            icon: "info",
                            iconColor: "rgb(6 182 212)",
                            showConfirmButton: false,
                            timer: 2500,
                        })
                    }else {
                        Swal.fire({
                            title: "Saved idea!",
                            color: "rgb(6 182 212)",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2500,
                        })
                    }
                })
            }

            const li = document.createElement("li");

            li.innerText = tweet.tweet;
            li.classList.add("text-green-500", "list-none", "text-xl", "w-full", "flex", "justify-between", "m-auto", "bg-white", "p-5", "rounded", "font-medium", "mb-2")
            li.appendChild(btnDelete);
            
            tweetList.appendChild(li);
        });

    }

    addLocalStorage();

}

function addLocalStorage () {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function deleteTweet (id) {
    tweets = tweets.filter( tweet => tweet.id !== id );
    addHTML();
}

function cleanHTML () {
    while( tweetList.firstChild ) {
        tweetList.removeChild( tweetList.firstChild );
    }
}
