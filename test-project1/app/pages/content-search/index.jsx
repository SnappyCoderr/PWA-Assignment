import React from 'react'
import fetch from 'cross-fetch'
import {List, ListItem} from '@chakra-ui/react'
import Link from '../../components/link'

const ContentSearch = ({contentResult}) => {
    if (!contentResult) {
        return <div>Loading...</div>
    }

    const {hits = []} = contentResult
    return (
        <div>
            <div>Search Results</div>
            {hits.length ? (
                <List>
                    {hits.map(({id, name}) => (
                        <Link key={id} to={`/content/${id}`}>
                            <ListItem>{name}</ListItem>
                        </Link>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getProps = async () => {
    let contentResult
    const res = await fetch(
        `http://localhost:3000/mobify/proxy/ocapi/s/RefArchGlobal/dw/shop/v20_2/content_search?q=about&client_id=1c4ef2eb-5e17-4d15-97ea-25641d30c338`
    )
    if (res.ok) {
        contentResult = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return {contentResult}
}

ContentSearch.getTemplateName = () => 'content-search'

export default ContentSearch
