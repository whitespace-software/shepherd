export interface CornerRadiusObj {
    bottomLeft: number;
    bottomRight: number;
    topLeft: number;
    topRight: number;
}

export interface OverlayPathParams {
    height: number;
    r?: number | CornerRadiusObj;
    x?: number;
    y?: number;
    width: number;
}

function getRadiusProps(r: OverlayPathParams["r"]): CornerRadiusObj {
    if(!r || typeof r === "number"){
        const radius = r ?? 0;
        return {
            topLeft: radius,
            topRight: radius,
            bottomLeft: radius,
            bottomRight: radius,
        }
    }

    return r;

}

// /**
//  * Generates the svg path data for a rounded rectangle overlay
//  * @param dimension - Dimensions of rectangle.
//  * @param dimension.width - Width.
//  * @param dimension.height - Height.
//  * @param dimension.x - Offset from top left corner in x axis. default 0.
//  * @param dimension.y - Offset from top left corner in y axis. default 0.
//  * @param dimension.r - Corner Radius. Keep this smaller than half of width or height.
//  * @returns Rounded rectangle overlay path data.
//  */
// export function makeOverlayPath(pathParams: OverlayPathParams) {

//     const { width, height, x = 0, y = 0, r = 0 } = pathParams;
//     const { innerWidth: w, innerHeight: h } = window;
//     const { topLeft, topRight, bottomRight, bottomLeft } = getRadiusProps(r);

//     return `
//         M${w},${h}\
//         H0\
//         V0\
//         H${w}\
//         V${h}\
//         Z\
//         M${x + topLeft},${y}\
//         a${topLeft},${topLeft},0,0,0-${topLeft},${topLeft}\
//         V${height + y - bottomLeft}\
//         a${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}\
//         H${width + x - bottomRight}\
//         a${bottomRight},${bottomRight},0,0,0,${bottomRight}-${bottomRight}\
//         V${y + topRight}\
//         a${topRight},${topRight},0,0,0-${topRight}-${topRight}\
//         Z
//     `;
// }

export function makeOverlayPath(mainPath: OverlayPathParams, seconaryPaths: OverlayPathParams[] | undefined) {
    const pathParamsList = [mainPath, ...seconaryPaths ?? []];
    const { innerWidth: w, innerHeight: h } = window;

    let path = `
        M${w},${h}\
        H0\
        V0\
        H${w}\
        V${h}\
        Z\
    `;

    pathParamsList.forEach(pathParams => {
        const { width, height, x = 0, y = 0, r } = pathParams;
        const { topLeft, topRight, bottomRight, bottomLeft } = getRadiusProps(r);

        path += `
            M ${x + topLeft},${y}\
            a ${topLeft},${topLeft},0,0,0-${topLeft},${topLeft}\
            V ${height + y - bottomLeft}\
            a ${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}\
            H ${width + x - bottomRight}\
            a ${bottomRight},${bottomRight},0,0,0,${bottomRight}-${bottomRight}\
            V ${y + topRight}\
            a ${topRight},${topRight},0,0,0-${topRight}-${topRight}\
            Z\
        `;

    });

    return path;

}
