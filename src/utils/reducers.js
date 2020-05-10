export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'size':
            return setOpenMenu({ sizeOpen: true, finishOpen: false })
        case 'finish':
            return setOpenMenu({ sizeOpen: false, finishOpen: true })
        default:
            throw new Error();
    }
}
export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'detail':
            return {
                openDetail: true,
                openContact: false,
                productSelect: action.product,
                opacity: .1
            }
        case 'contact':
            return {
                openDetail: false,
                openContact: true,
                productSelect: action.product,
                opacity: .1,
            }
        case 'initial':
            return {
                openDetail: false,
                openContact: false,
                productSelect: null,
                opacity: 1
            }
    }
}
