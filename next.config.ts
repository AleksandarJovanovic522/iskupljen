import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    turbopack: {
        root: __dirname,
        rules: {
            '*.svg': {
                loaders: [
                    {
                        loader: '@svgr/webpack',
                        options: { icon: false, svgo: true }
                    }
                ],
                as: '*.js'
            }
        }
    }
}

export default nextConfig
