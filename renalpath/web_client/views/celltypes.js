/* Taken from https://github.com/SarderLab/FUSION/blob/
 * 92b3e3e1126eaa4a2887a45e191665fc0bb5e262/assets/graphic_reference.json
 */
var CellTypes = {
    'PT': {
        'full': 'Proximal Tubule',
        'subtypes': ['PT', 'PT-S1', 'PT-S2', 'PT-S3', 'aPT', 'cycPT', 'dPT', 'dPT/DTL', 'aPT1', 'aPT2'],
        'states': ['reference', 'reference', 'reference', 'reference', 'altered', 'cycling', 'degenerative', 'degenerative', 'altered', 'altered'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': ['243,83,69', '241,189,106', '223,239,108']
    },
    'DTL': {
        'full': 'Descending Thin Limb',
        'subtypes': ['DTL', 'DTL1', 'DTL2', 'DTL3', 'dDTL3', 'dDTL', 'aDTL2'],
        'states': ['reference', 'reference', 'reference', 'reference', 'degenerative', 'degenerative', 'altered'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': ['116,171,10']
    },
    'ATL': {
        'full': 'Ascending Thin Limb',
        'subtypes': ['ATL', 'dATL'],
        'states': ['reference', 'degenerative'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': ['100,204,113']
    },
    'TAL': {
        'full': 'Thick Ascending Limb',
        'subtypes': ['TAL', 'aTAL1', 'aTAL2', 'M-TAL', 'dM-TAL', 'C-TAL', 'dC-TAL', 'MD', 'cycTAL'],
        'states': ['reference', 'altered', 'altered', 'reference', 'degenerative', 'reference', 'degenerative', 'reference', 'cycling'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': ['130,217,184']
    },
    'DCT': {
        'full': 'Distal Convoluted Tubule',
        'subtypes': ['DCT', 'DCT1', 'DCT2', 'dDCT', 'cycDCT', 'aDCT'],
        'states': ['reference', 'reference', 'reference', 'degenerative', 'cycling', 'altered'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': ['114,198,232']
    },
    'CNT': {
        'full': 'Connecting Tubule',
        'subtypes': ['CNT', 'CNT-PC', 'dCNT', 'cycCNT', 'aCNT'],
        'states': ['reference', 'reference', 'degenerative', 'cycling', 'altered'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': ['104,161,243']
    },
    'PC': {
        'full': 'Principal Cell',
        'subtypes': ['PC', 'C-PC', 'CCD-PC', 'OMCD-PC', 'M-PC', 'dOMCD-PC', 'dM-PC', 'IMCD', 'dIMCD'],
        'states': ['reference', 'reference', 'reference', 'reference', 'reference', 'degenerative', 'degenerative', 'reference', 'degenerative'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': ['255,207,216']
    },
    'IC': {
        'full': 'Intercalated Cell',
        'subtypes': ['IC', 'C-IC-A', 'CCD-IC-A', 'CNT-IC-A', 'dC-IC-A', 'OMCD-IC-A', 'M-IC-A', 'tPC-IC', 'IC-B'],
        'states': ['reference', 'reference', 'reference', 'reference', 'degenerative', 'reference', 'reference', 'transitioning', 'reference'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': ['242,188,198']
    },
    'PapE': {
        'full': 'Papillary Tip Epithelial',
        'subtypes': ['PapE'],
        'states': ['reference'],
        'structure': ['Tubule'],
        'class': ['Epithelial'],
        'color_code': []
    },
    'POD': {
        'full': 'Podocyte',
        'subtypes': ['POD', 'dPOD'],
        'states': ['reference', 'degenerative'],
        'structure': ['Glomerulus'],
        'class': ['Epithelial'],
        'color_code': ['101,11,164']
    },
    'PEC': {
        'full': 'Parietal Epithelial Cell',
        'subtypes': ['PEC'],
        'states': ['reference'],
        'structure': ['Glomerulus'],
        'class': ['Epithelial'],
        'color_code': ['143,6,106']
    },
    'EC': {
        'full': 'Endothelial Cell',
        'subtypes': ['EC', 'EC-GC', 'EC-AEA', 'EC-DVR', 'EC-PTC', 'dEC-PTC', 'EC-AVR', 'dEC', 'cycEC', 'EC-LYM'],
        'states': ['reference', 'reference', 'reference', 'reference', 'reference', 'degenerative', 'reference', 'degenerative', 'cycling', 'reference'],
        'structure': ['Various'],
        'class': ['Endothelial'],
        'color_code': ['239,241,241']
    },
    'VSM/P': {
        'full': 'Vascular Smooth Muscle Cell / Pericyte',
        'subtypes': ['VSM/P', 'MC', 'REN', 'VSMC', 'VSMC/P', 'dVSMC'],
        'states': ['reference', 'reference', 'reference', 'reference', 'reference', 'degenerative'],
        'structure': ['Various'],
        'class': ['Stroma'],
        'color_code': ['204,206,211', '244,247,223']
    },
    'FIB': {
        'full': 'Fibroblast',
        'subtypes': ['FIB', 'MYOF', 'cycMYOF', 'M-FIB', 'dM-FIB', 'aFIB', 'dFIB'],
        'states': ['reference', 'reference', 'reference', 'reference', 'degenerative', 'altered', 'degenerative'],
        'structure': ['Interstitium'],
        'class': ['Stroma'],
        'color_code': ['238,133,133', '255,252,221']
    },
    'IMM': {
        'full': 'Immune Cell',
        'subtypes': ['IMM', 'B', 'PL', 'T', 'NKT', 'MAST', 'MAC-M2', 'cycMNP', 'MDC', 'cDC', 'pDC', 'ncMON', 'N', 'cycMAC'],
        'states': ['reference', 'reference', 'reference', 'reference', 'reference', 'reference', 'reference', 'cycling', 'reference', 'reference', 'reference', 'reference', 'reference', 'cycling'],
        'structure': ['Interstitium'],
        'class': ['Immune'],
        'color_code': ['217,217,217', '229,229,227']
    },
    'NEU': {
        'full': 'Neural Cells',
        'subtypes': ['NEU', 'SC/NEU'],
        'states': ['reference', 'reference'],
        'structure': ['Interstitium'],
        'class': ['Neural'],
        'color_code': []
    }
};
const CellTypeLookup = {};
Object.entries(CellTypes).forEach(([key, value]) => {
    value.subtypes.forEach((sub, idx) => {
        CellTypeLookup[sub] = {'main': key, 'state': value.states[idx]};
    });
});
const UnknownTypes = {};

function convertCellTypes(user) {
    const topkey = 'Main_Cell_Types';
    const subkey = 'Cell_States';
    const l3key = 'L3 SubTypes';

    if (user[topkey] || !user[l3key]) {
        return;
    }
    user[topkey] = {};
    user[subkey] = {};
    Object.entries(user[l3key]).forEach(([key, value]) => {
        var info = CellTypeLookup[key];
        if (!info && key.indexOf('-') > 0) {
            let newkey = key.substring(0, key.indexOf('-'));
            info = CellTypeLookup[newkey];
        }
        if (!info && key.indexOf('-') > 0 && key.indexOf('-', key.indexOf('-') + 1) > 0) {
            let newkey = key.substring(key.indexOf('-') + 1, key.indexOf('-', key.indexOf('-') + 1));
            info = CellTypeLookup[newkey];
        }
        if (!info) {
            if (value && key !== 'max') {
                UnknownTypes[key] = true;
                // console.log(UnknownTypes);
            }
            return;
        }
        if (!user[subkey][info.main]) {
            user[subkey][info.main] = {};
        }
        user[topkey][info.main] = (user[topkey][info.main] || 0) + value;
        user[subkey][info.main][info.state] = (user[subkey][info.main][info.state] || 0) + value;
    });
    const total = Object.values(user[topkey]).reduce((sum, value) => sum + value, 0);
    if (total && total !== 1) {
        Object.keys(user[topkey]).forEach((key) => {
            user[topkey][key] /= total;
        });
    }
    Object.values(user[subkey]).forEach((states) => {
        const total = Object.values(states).reduce((sum, value) => sum + value, 0);
        if (total && total !== 1) {
            Object.keys(states).forEach((key) => {
                states[key] /= total;
            });
        }
    });
}

export { convertCellTypes, CellTypes, CellTypeLookup };
