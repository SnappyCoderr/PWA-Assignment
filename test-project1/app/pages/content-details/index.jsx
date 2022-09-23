import React from 'react'
import fetch from 'cross-fetch'
import {HTTPError} from 'pwa-kit-react-sdk/ssr/universal/errors'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

const ContentDetails = ({contentResult, error}) => {
    if (error) {
        return <div>{error.fault.message}</div>
    }

    if (!contentResult) {
        return <div>Loading...</div>
    }

    return <div dangerouslySetInnerHTML={{__html: contentResult.c_body}} />
}

ContentDetails.getProps = async ({params, res}) => {
    let contentResult, error
    const result = await fetch(
        `${getAppOrigin()}/mobify/proxy/ocapi/s/RefArchGlobal/dw/shop/v20_2/content/${
            params.id
        }?client_id=1c4ef2eb-5e17-4d15-97ea-25641d30c338`
    )

    if (result.ok) {
        contentResult = await result.json()
    } else {
        error = await result.json()
        if (res) {
            res.status(result.status)
        }
    }

    return {contentResult, error}
}

ContentDetails.getTemplateName = () => 'content-details'

export default ContentDetails
