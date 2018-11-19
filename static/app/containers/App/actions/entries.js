export const get_entries = () => ({type: 'SAGA_GET_ENTRIES'})

export const post_offer = (data) => ({type: 'SAGA_POST_OFFER', payload: data})

export const post_request = (data) => ({type: 'SAGA_POST_REQUEST', payload: data})

export const delete_offer = (entry_id) => ({type: "SAGA_DELETE_OFFER", payload: entry_id})

export const delete_request = (entry_id) => ({type: "SAGA_DELETE_REQUEST", payload: entry_id})

export const patch_join = (entry_id, user_id) => ({type: "SAGA_PATCH_JOIN", payload: {entry_id, user_id}})