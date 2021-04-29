<script>
    import { db } from "../../firebase.js";
    let arr1 = [],
        arr2 = [];
    let state = 0;

    let collection = ["orders", "approved"];

    db.collection("orders")
        .orderBy("amount", "desc")
        .onSnapshot((data) => {
            arr1 = data.docs;
        });

    db.collection("approved")
        .orderBy("amount", "desc")
        .onSnapshot((data) => {
            arr2 = data.docs;
        });

    function removeOrder(itemID) {
        db.collection(collection[state]).doc(itemID).delete();
    }
    function approveOrder(data, itemID) {
        db.collection("approved").add({
            name: data.name,
            id: data.id,
            amount: data.amount,
            description: data.description,
            date: data.date,
        });
        db.collection("orders").doc(itemID).delete();
    }
    function changeState() {
        state++;
        if (state > 1) state = 0;
    }
</script>

<button class="changeState" on:click={changeState}>Change List</button>
{#if state == 0}
    <h4>Here are your orders</h4>
    {#each arr1 as object}
        <div class="items">
            <p>{object.data().name + ", " + object.data().date}</p>
            <p>{object.data().amount + "€"}</p>
            <p>{object.data().description}</p>
            <button class="manageButton" on:click={removeOrder(object.id)}
                >🗙</button
            >
            <button
                class="manageButton"
                on:click={approveOrder(object.data(), object.id)}>✔</button
            >
        </div>
        <br />
    {/each}
{:else if state == 1}
    <h4>Here are your approved orders</h4>
    {#each arr2 as object}
        <div class="items">
            <p>{object.data().name + ", " + object.data().date}</p>
            <p>{object.data().amount}</p>
            <p>{object.data().description}</p>
            <button class="manageButton" on:click={removeOrder(object.id)}
                >🗙</button
            >
        </div>
        <br />
    {/each}
{/if}

<style>
    p {
        word-wrap: break-word;
    }

    .items {
        background: #dbdbdb;
        border: #ff3e00 0.2em solid;
        padding: 1em;
        max-width: 22em;
    }

    .manageButton {
        border-radius: 50%;
        background: #fa9f55;
        width: 2em;
    }

    .changeState {
        background: #dbdbdb;
        border: #fa9f55 0.2em solid;
        padding: 0.5em;
    }

    .changeState:active {
        background: #dbdbdb;
        border: #ff5e00 0.2em solid;
    }
</style>
