export const CategoryCollection = `
	fragment CategoryCollection on Collection {
		id
		name
		slug
		breadcrumbs {
			id
			name
			slug
		}
		featuredAsset{
			preview
		}
		description
	}
`;

export const RecursiveCollections = `
	${CategoryCollection}

	fragment RecursiveCollections on Collection {
		parent {
			...CategoryCollection
		}
		children {
			...CategoryCollection
			children {
				...CategoryCollection
				children {
					...CategoryCollection
				}
			}
		}
	}
`;
