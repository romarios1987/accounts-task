const data = {
    accounts: [
        {
            "title": "John Dou",
            "img": "./avatar-png-1.png"
        },
        {
            "title": "Mark Zuckerberg",
            "img": "./avatar-png-1.png"
        },
        {
            "title": "Evan You",
            "img": "./avatar-png-1.png"
        },
    ],
};


const getInput = new GetElement(".input-form").selector;
const accounts = new GetElement(".accounts").selector;
const addFrom = new GetElement(".add-form").selector;
const getCreateButton = new GetElement("#createBtn").selector;
const getAddButton = new GetElement("#addBtn").selector;
const getCancelButton = new GetElement("#cancelBtn").selector;
let positionListItem = 0;
let whichButton = getAddButton;


function GetElement(element) {
    this.selector = document.querySelector(element);
    this.selectorAll = document.querySelectorAll(element);
}

function CreateElement(element) {
    return (this.element = document.createElement(element));
}

function AppendElement(parent, children) {
    return parent.append(children);
}

function RemoveElement(element) {
    return element.remove();
}


const displayList = (currentData) => {
    const { accounts } = currentData;
    accounts.map((item, index) => {
        const getList = new GetElement(".accounts__list").selector;
        const listItem = new CreateElement("li");
        const img = new CreateElement("img");
        const title = new CreateElement("p");

        listItem.classList.add("account-item");
        listItem.setAttribute("tabindex", index + 1);
        img.setAttribute("src", item.img);
        title.innerHTML = item.title;

        new AppendElement(listItem, img);
        new AppendElement(listItem, title);
        new AppendElement(getList, listItem);
    });
};

const updateList = (newData, accountsLength) => {
    clearList();
    displayList(newData);

    if (accountsLength !== 0) {
        setFocusToFirstElement();
    }
};

const clearList = () => {
    const getListItems = new GetElement(".accounts__list > li").selectorAll;

    for (const item of getListItems) {
        new RemoveElement(item);
    }
};

const setFocus = (element) => {
    return element.focus();
};

const setFocusToFirstElement = () => {
    const getFirstListItem = new GetElement(".account-item").selector;
    setFocus(getFirstListItem);
};

const navigationScreenOne = (e) => {
    const getList = new GetElement(".accounts__list").selector;
    const newData = { ...data };
    const focusedAccount = document.activeElement;
    const accountsLength = data.accounts.length;
    const isFocusOnButton =
        e.key === "ArrowLeft" &&
        focusedAccount.getAttribute("id") === "createBtn" &&
        accountsLength !== 0;

    const onArrowLeft = () => {
        const accountToFocus = getList.children[positionListItem];

        switch (isFocusOnButton) {
            case true:
                setFocus(accountToFocus);
                break;
            case false:
                newData.accounts.splice(positionListItem, 1);
                updateList(newData, newData.accounts.length);
                positionListItem = 0;
                data.accounts.length !== 0
                    ? setFocus(accountToFocus)
                    : setFocus(getCreateButton);
                break;
            default:
                break;
        }
    };
    const onArrowUp = () => {
        if (positionListItem > 0) {
            positionListItem -= 1;
            setFocus(getList.children[positionListItem]);
        }
    };
    const onArrowDown = () => {
        if (positionListItem < accountsLength - 1) {
            positionListItem += 1;
            setFocus(getList.children[positionListItem]);
        }
    };

    switch (e.key) {
        case "ArrowLeft":
            onArrowLeft();
            break;
        case "ArrowUp":
            onArrowUp();
            break;
        case "ArrowRight":
            setFocus(getCreateButton);
            break;
        case "ArrowDown":
            onArrowDown();
            break;
        default:
            break;
    }
};

const navigationScreenTwo = (e) => {
    const isInputFocused = document.activeElement === getInput;

    switch (e.key) {
        case "ArrowLeft":
            if (!isInputFocused) {
                setFocus(getAddButton);
                whichButton = getAddButton;
            }
            break;
        case "ArrowUp":
            setFocus(getInput);
            break;
        case "ArrowRight":
            if (!isInputFocused) {
                setFocus(getCancelButton);
                whichButton = getCancelButton;
            }
            break;
        case "ArrowDown":
            setFocus(whichButton);
            break;
        default:
            break;
    }
};

const toggleScreens = () => {
    accounts.classList.toggle("isHidden");
    addFrom.classList.toggle("isVisible");
};


const onCreateAccount = (e) => {
    if (e.key === "Enter") {
        toggleScreens();
        setFocus(getInput);
    }
};

const onAddAccount = (e) => {
    const inputValue = getInput.value;
    const newData = { ...data };
    if (e.key === "Enter") {
        newData.accounts.push({
            title: inputValue,
            img: "./avatar-png-1.png",
        });

        updateList(newData);
        toggleScreens();
        getInput.value = "";
        setFocusToFirstElement();
    }
};

const onCancelAccount = (e) => {
    if (e.key === "Enter") {
        toggleScreens();
        setFocusToFirstElement();
        getInput.value = "";
    }
};


getCreateButton.addEventListener("keydown", onCreateAccount);
getAddButton.addEventListener("keydown", onAddAccount);
getCancelButton.addEventListener("keydown", onCancelAccount);
accounts.addEventListener("keydown", navigationScreenOne);
addFrom.addEventListener("keydown", navigationScreenTwo);
document.addEventListener("mousedown", (e) => e.preventDefault());

displayList(data);
setFocusToFirstElement();
