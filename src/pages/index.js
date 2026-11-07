// تسجيل صفحات المشاريع (تنفيذ static يدعم مشاريع متعددة مسجلة)
import { getCurrentProject } from '../config.js';

import Default01 from '@projects/default/pages/page01/page.jsx';
import Default02 from '@projects/default/pages/page02/page.jsx';
import Default03 from '@projects/default/pages/page03/page.jsx';
import Default04 from '@projects/default/pages/page04/page.jsx';
import Default05 from '@projects/default/pages/page05/page.jsx';
import Default06 from '@projects/default/pages/page06/page.jsx';
import Default07 from '@projects/default/pages/page07/page.jsx';
import Default08 from '@projects/default/pages/page08/page.jsx';
import Default09 from '@projects/default/pages/page09/page.jsx';
import Default10 from '@projects/default/pages/page10/page.jsx';
import Default11 from '@projects/default/pages/page11/page.jsx';
import Default12 from '@projects/default/pages/page12/page.jsx';
import Default13 from '@projects/default/pages/page13/page.jsx';
import Default14 from '@projects/default/pages/page14/page.jsx';
import Default15 from '@projects/default/pages/page15/page.jsx';
import Default16 from '@projects/default/pages/page16/page.jsx';
import Default17 from '@projects/default/pages/page17/page.jsx';
import Default18 from '@projects/default/pages/page18/page.jsx';
import Default19 from '@projects/default/pages/page19/page.jsx';
import Default20 from '@projects/default/pages/page20/page.jsx';
import Default21 from '@projects/default/pages/page21/page.jsx';
import Default22 from '@projects/default/pages/page22/page.jsx';
import Default23 from '@projects/default/pages/page23/page.jsx';
import Default24 from '@projects/default/pages/page24/page.jsx';
import Default25 from '@projects/default/pages/page25/page.jsx';
import Default26 from '@projects/default/pages/page26/page.jsx';
import Default27 from '@projects/default/pages/page27/page.jsx';
import Default28 from '@projects/default/pages/page28/page.jsx';
import Default29 from '@projects/default/pages/page29/page.jsx';
import Default30 from '@projects/default/pages/page30/page.jsx';
import Default31 from '@projects/default/pages/page31/page.jsx';
import Default32 from '@projects/default/pages/page32/page.jsx';
import Default33 from '@projects/default/pages/page33/page.jsx';
import Default34 from '@projects/default/pages/page34/page.jsx';
import Default35 from '@projects/default/pages/page35/page.jsx';
import Default36 from '@projects/default/pages/page36/page.jsx';
import Default37 from '@projects/default/pages/page37/page.jsx';
import Default38 from '@projects/default/pages/page38/page.jsx';
import Default39 from '@projects/default/pages/page39/page.jsx';
import Default40 from '@projects/default/pages/page40/page.jsx';

import GraduationRoeda01 from '@projects/graduation-roeda/pages/page01/page.jsx';

export const PROJECT_PAGES = {
  default: [
    Default01, Default02, Default03, Default04, Default05, Default06, Default07, Default08, Default09, Default10,
    Default11, Default12, Default13, Default14, Default15, Default16, Default17, Default18, Default19, Default20,
    Default21, Default22, Default23, Default24, Default25, Default26, Default27, Default28, Default29, Default30,
    Default31, Default32, Default33, Default34, Default35, Default36, Default37, Default38, Default39, Default40,
  ],
  'graduation-roeda': [GraduationRoeda01],
};

export function getPages(projectId) {
  return PROJECT_PAGES[projectId] || PROJECT_PAGES.default || [];
}

// للتوافق مع الكود القديم
export const PAGES = getPages(getCurrentProject());
