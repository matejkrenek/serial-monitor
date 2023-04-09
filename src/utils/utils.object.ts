import { TypeFromObjectPropertyPath } from '@/types'

export function setProperty<Type extends Record<string | number, any>, Property extends string>(
    property: Property,
    value: TypeFromObjectPropertyPath<Type, Property> extends never
        ? unknown
        : TypeFromObjectPropertyPath<Type, Property>,
    object?: Type
) {
    if (!object) object = {} as any

    let schema: any = object

    const keys = (property as any).split('.')

    keys.forEach((key: string, index: number) => {
        if (schema.hasOwnProperty(key) && keys.length - 1 !== index) {
            schema = schema[key]
        }
    })
    schema[keys[keys.length - 1]] = value

    return object as Type & Record<string | number, any>
}
