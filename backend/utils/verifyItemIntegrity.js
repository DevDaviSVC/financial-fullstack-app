const verifyItemIntegrity = (item) => {
    if (!item.name || !item.value || !item.type || !item.authorId || !item.id) {
        return false;
    }

    if (item.type !== "profit" && item.type !== "debit") {
        return false;
    }
    
    return true;
};

export default verifyItemIntegrity;